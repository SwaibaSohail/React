import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from './CartContext'
import { useCart } from '../hooks/useCart'

const product = { id: 1, title: 'Test Product', price: 10.00, image: 'img.jpg' }
const product2 = { id: 2, title: 'Another Product', price: 25.00, image: 'img2.jpg' }

function TestComponent() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  return (
    <div>
      <div data-testid="item-count">{items.length}</div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="total-price">{totalPrice.toFixed(2)}</div>
      {items.map(item => (
        <div key={item.id} data-testid={`item-${item.id}-qty`}>{item.quantity}</div>
      ))}
      <button onClick={() => addItem(product)}>Add</button>
      <button onClick={() => addItem(product2)}>Add2</button>
      <button onClick={() => removeItem(1)}>Remove</button>
      <button onClick={() => updateQuantity(1, 3)}>Update to 3</button>
      <button onClick={() => updateQuantity(1, 0)}>Update to 0</button>
      <button onClick={() => clearCart()}>Clear</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  )
}

describe('CartProvider', () => {
  test('1. renders children', () => {
    render(
      <CartProvider>
        <div data-testid="child">hello</div>
      </CartProvider>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  test('2. addItem adds a new item with quantity 1', () => {
    renderWithProvider()
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-1-qty')).toHaveTextContent('1')
  })

  test('3. addItem increments quantity for existing item', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    expect(screen.getByTestId('item-1-qty')).toHaveTextContent('2')
  })

  test('4. removeItem removes item from cart', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    fireEvent.click(screen.getByText('Remove'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
  })

  test('5. updateQuantity updates item quantity', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Update to 3'))
    expect(screen.getByTestId('item-1-qty')).toHaveTextContent('3')
  })

  test('6. updateQuantity with quantity <= 0 removes the item', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('1')
    fireEvent.click(screen.getByText('Update to 0'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
  })

  test('7. clearCart empties the cart', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add2'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('2')
    fireEvent.click(screen.getByText('Clear'))
    expect(screen.getByTestId('item-count')).toHaveTextContent('0')
  })

  test('8. useCart throws error when used outside CartProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow(
      'useCart must be used within a CartProvider'
    )
    consoleError.mockRestore()
  })

  test('9. totalItems computed correctly', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add2'))
    // product1 qty=2, product2 qty=1 => totalItems=3
    expect(screen.getByTestId('total-items')).toHaveTextContent('3')
  })

  test('10. totalPrice computed correctly', () => {
    renderWithProvider()
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add2'))
    // product1: 10*2=20, product2: 25*1=25 => total=45.00
    expect(screen.getByTestId('total-price')).toHaveTextContent('45.00')
  })
})
