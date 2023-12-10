import Cookies from 'js-cookie'
import { IShippingAddress } from '@/interfaces'

export const getAddressFromCookie = (): IShippingAddress => {
  return {
    firtsName: Cookies.get('firtsName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  }
}