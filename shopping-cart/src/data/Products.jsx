import iphone14 from '../images/iphone-14.png';
import galaxyS22 from '../images/galaxy-s22.png';
import pixel6 from '../images/pixel-6.png';
import mi11 from '../images/mi-11.png';
import oneplus9 from '../images/oneplus-9.png';
import motoGPower from '../images/moto-g-power.png';
import redmiNote11 from '../images/redmi-note-11.png';
import samsungA53 from '../images/samsung-a53.png';
import iphone13 from '../images/iphone-13.png';
import pixel7 from '../images/pixel-7.png';
import nokiaG20 from '../images/nokia-g20.png';
import rog6 from '../images/asus-rog-6.png';
import nordCE3 from '../images/oneplus-nord-ce-3.png';
import gtNeo3 from '../images/realme-gt-neo-3.png';
import p50Pro from '../images/huawei-p50-pro.png';

const products = [
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    price: 999,
    image: iphone14,
    description: 'Cámara dual y A15 Bionic.',
    stock: 5,
    discount: 0.4,
    featured: true,
  },
  {
    id: 'galaxy-s22',
    name: 'Galaxy S22',
    price: 799,
    image: galaxyS22,
    description: 'AMOLED y triple cámara.',
    stock: 8,
    discount: 0.2,
    featured: true,
  },
  {
    id: 'pixel-6',
    name: 'Pixel 6',
    price: 699,
    image: pixel6,
    description: 'Android puro y cámara excepcional.',
    stock: 10,
    discount: 0,
    featured: false,
  },
  {
    id: 'mi-11',
    name: 'Mi 11',
    price: 629,
    image: mi11,
    description: 'Snapdragon 888 y 120Hz.',
    stock: 4,
    discount: 0,
    featured: false,
  },
  {
    id: 'oneplus-9',
    name: 'OnePlus 9',
    price: 729,
    image: oneplus9,
    description: 'Carga rápida y OxygenOS.',
    stock: 6,
    discount: 0.1,
    featured: false,
  },
  {
    id: 'moto-g-power',
    name: 'Moto G Power',
    price: 199,
    image: motoGPower,
    description: 'Batería 5000mAh.',
    stock: 12,
    discount: 0,
    featured: false,
  },
  {
    id: 'xiaomi-redmi-note-11',
    name: 'Redmi Note 11',
    price: 299,
    image: redmiNote11,
    description: 'AMOLED 90Hz y Snapdragon 680.',
    stock: 7,
    discount: 0.15,
    featured: false,
  },
  {
    id: 'samsung-a53',
    name: 'Samsung A53',
    price: 449,
    image: samsungA53,
    description: 'Pantalla 120Hz y cámara cuádruple.',
    stock: 5,
    discount: 0.1,
    featured: false,
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    price: 899,
    image: iphone13,
    description: 'Chip A15 y diseño elegante.',
    stock: 3,
    discount: 0.3,
    featured: false,
  },
  {
    id: 'pixel-7',
    name: 'Pixel 7',
    price: 799,
    image: pixel7,
    description: 'Google Tensor y Android 13.',
    stock: 6,
    discount: 0.25,
    featured: false,
  },
  {
    id: 'nokia-g20',
    name: 'Nokia G20',
    price: 179,
    image: nokiaG20,
    description: 'Batería de larga duración.',
    stock: 10,
    discount: 0,
    featured: false,
  },
  {
    id: 'asus-rog-6',
    name: 'ASUS ROG Phone 6',
    price: 999,
    image: rog6,
    description: 'Gamer, Snapdragon 8+ Gen 1.',
    stock: 2,
    discount: 0.2,
    featured: false,
  },
  {
    id: 'oneplus-nord-ce-3',
    name: 'OnePlus Nord CE 3',    price: 349,
    image: nordCE3,
    description: 'Carga rápida y pantalla fluida.',
    stock: 8,
    discount: 0.1,
    featured: false,
  },
  {
    id: 'realme-gt-neo-3',
    name: 'Realme GT Neo 3',
    price: 499,
    image: gtNeo3,
    description: 'Carga 150W y Dimensity 8100.',
    stock: 6,
    discount: 0.15,
    featured: false,
  },
  {
    id: 'huawei-p50-pro',
    name: 'Huawei P50 Pro',
    price: 999,
    image: p50Pro,
    description: 'Cámara Leica y diseño premium.',
    stock: 4,
    discount: 0.1,
    featured: false,
  },
];

export default products;