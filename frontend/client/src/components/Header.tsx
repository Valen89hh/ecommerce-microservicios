'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, Menu, Leaf, LogOut, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../components/ui/drawer';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const Header = () => {
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Simulación de datos
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Producto Natural',
      price: 20,
      quantity: 2,
      image: '/example.jpg',
    },
  ]);

  const [user, setUser] = useState({ firstName: 'Juan', lastName: 'Pérez', email: 'juan@example.com' });
  const isAuthenticated = true;

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleLogout = () => {
    setUser(null as any);
    router.push('/');
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    const item = items.find((item) => item.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    alert(`${item?.name} ha sido eliminado del carrito`);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal + shipping + subtotal * 0.08;
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">NaturaSalud</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos naturales..."
                className="pl-10 pr-4 w-full border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium text-sm xl:text-base">Inicio</Link>
            <Link href="/products" className="text-gray-700 hover:text-emerald-600 font-medium text-sm xl:text-base">Productos</Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 font-medium text-sm xl:text-base">Sobre Nosotros</Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 font-medium text-sm xl:text-base">Contacto</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">Mi Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[85vh] max-w-md ml-auto mr-0 bg-white">
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="flex items-center justify-between">
                      <span>Mi Carrito ({totalItems})</span>
                      <DrawerClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="w-4 h-4" />
                        </Button>
                      </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription>
                      {items.length === 0 ? 'Tu carrito está vacío' : 'Productos seleccionados'}
                    </DrawerDescription>
                  </DrawerHeader>
                  
                  <div className="p-4 pb-0">
                    {items.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                        <DrawerClose asChild>
                          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => router.push('/products')}>
                            Explorar Productos
                          </Button>
                        </DrawerClose>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-80 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-sm text-emerald-600 font-semibold">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {items.length > 0 && (
                    <DrawerFooter>
                      <div className="space-y-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                          <div className="flex justify-between"><span>Envío:</span><span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span></div>
                          <div className="flex justify-between font-semibold"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                        </div>
                        <div className="space-y-2">
                          <DrawerClose asChild>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => router.push('/checkout')}>
                              Finalizar Compra
                            </Button>
                          </DrawerClose>
                          <DrawerClose asChild>
                            <Button variant="outline" className="w-full" onClick={() => router.push('/cart')}>
                              Ver Carrito Completo
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    </DrawerFooter>
                  )}
                </div>
              </DrawerContent>
            </Drawer>

            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
