import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome to opencart/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders navigation bar with brand and links', () => {
  render(<App />);
  
  // Check for OpenCart brand in navbar specifically
  const brandElement = screen.getByRole('link', { name: /opencart/i });
  expect(brandElement).toBeInTheDocument();
  expect(brandElement).toHaveClass('navbar-brand');
  
  // Check for navigation links
  const homeLink = screen.getByRole('link', { name: /^home$/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveClass('nav-link');
  
  const cartNavLink = screen.getByRole('link', { name: /^cart$/i });
  expect(cartNavLink).toBeInTheDocument();
  expect(cartNavLink).toHaveClass('nav-link');
});

test('renders cart button with icon', () => {
  render(<App />);
  
  // Check for cart button specifically with btn classes
  const cartButtons = screen.getAllByRole('link');
  const cartIconButton = cartButtons.find(button => 
    button.classList.contains('btn') && button.classList.contains('btn-outline-light')
  );
  
  expect(cartIconButton).toBeInTheDocument();
  expect(cartIconButton).toHaveClass('btn', 'btn-outline-light', 'position-relative');
});

test('renders demo button with initial text', () => {
  render(<App />);
  
  // Check for demo button presence and initial state
  const demoButton = screen.getByTestId('demo-button');
  expect(demoButton).toBeInTheDocument();
  expect(demoButton).toHaveClass('btn', 'btn-primary');
  expect(demoButton).toHaveTextContent('Click Me!');
});

test('demo button changes text when clicked', async () => {
  const user = userEvent.setup();
  render(<App />);
  
  const demoButton = screen.getByTestId('demo-button');
  
  // Initial state
  expect(demoButton).toHaveTextContent('Click Me!');
  
  // Click the button
  await user.click(demoButton);
  
  // Check text changed
  expect(demoButton).toHaveTextContent('Button Clicked!');
  
  // Click again to toggle back
  await user.click(demoButton);
  
  // Check text reverted
  expect(demoButton).toHaveTextContent('Click Me!');
});
