'use client'

import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  PopoverGroup,
  Tab,
  TabGroup,
  TabList,
} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoPersonCircleOutline } from "react-icons/io5"
import { IoSettingsOutline } from "react-icons/io5"
import CategoryMenu from '../pages/CategoryMenu'


export default function Navbar({ products, categories, onCartClick, onProductClick, cartItemCount }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"/>
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600">
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                Sign in
              </Link>
              <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                Create account
              </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                  className="block h-auto w-5 shrink-0"/>
                <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          The Shop for Everyone. Style, comfort, and quality – all in one place. Explore collections curated for every lifestyle.
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Home */}
              <div className="relative ml-4 flex lg:ml-0">
                <Link to="/home" className="group -m-2 flex items-center p-2">
                <span className="sr-only">Open settings menu</span>
                <HiOutlineShoppingBag className="h-8 w-auto text-gray-400 group-hover:text-gray-500" />
                  </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categories.map((category) => (
                    <CategoryMenu
                      key={category.id}
                      category={category}
                      products={products}
                      onProductClick={onProductClick}
                    />
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <Link to="/upload_users" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Upload users (CSV)
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    onClick={onCartClick}
                    className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon className="size-6 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItemCount}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
                
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="group -m-2 flex items-center p-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <IoPersonCircleOutline className="size-8 rounded-full text-gray-400 group-hover:text-gray-500"/>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>

                 {/* Settings */}
                  <div className="relative ml-4 flex lg:ml-0 pl-5">
                  <Link to="/Settings" className="group -m-2 flex items-center p-2">
                      <IoSettingsOutline className="h-8 w-auto text-gray-400 group-hover:text-gray-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
