import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <FaIcons.FaDashcube />,
    cName: 'nav-text',
    isForClient: false
  },
  {
    title: 'Vehicle Type',
    path: '/vehicle-type',
    icon: <AiIcons.AiOutlineAppstore />,
    cName: 'nav-text',
    isForClient: true
  },
  {
    title: 'Vehicle Line',
    path: '/vehicle-line',
    icon: <FaIcons.FaLayerGroup />,
    cName: 'nav-text',
    isForClient: true
  },
  {
    title: 'Vehicle',
    path: '/vehicle',
    icon: <AiIcons.AiFillCar />,
    cName: 'nav-text',
    isForClient: true
  },
  {
    title: 'History',
    path: '/history',
    icon: <FaIcons.FaBookOpen />,
    cName: 'nav-text',
    isForClient: false
  },
  {
    title: 'Transaction',
    path: '/transaction',
    icon: <FaIcons.FaShoppingCart />,
    cName: 'nav-text',
    isForClient: false
  },
  {
    title: 'Recommend',
    path: '/recommendation',
    icon: <FaIcons.FaLaptopMedical />,
    cName: 'nav-text',
    isForClient: true,
  }
];