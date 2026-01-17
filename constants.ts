import { Customer, CustomerTag, Order, OrderStatus } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: '张伟',
    gender: 'male',
    phone: '13812345678',
    tags: [CustomerTag.WHITELIST, CustomerTag.REGULAR],
    idCard: '310110199001011234'
  },
  {
    id: 'c2',
    name: '李娜',
    gender: 'female',
    phone: '13987654321',
    tags: [CustomerTag.VIP],
    idCard: '310110199205054321'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-20231027-001',
    customerId: 'c1',
    customerName: '张伟',
    vehicleModel: 'Tesla Model 3 后轮驱动版',
    amount: 180000,
    status: OrderStatus.PENDING,
    updateTime: '2023-10-27 10:30',
    stagnationTime: '已停留 2小时'
  },
  {
    id: 'ORD-20231026-005',
    customerId: 'c2',
    customerName: '李娜',
    vehicleModel: 'BYD Han EV 冠军版',
    amount: 210000,
    status: OrderStatus.APPROVED,
    updateTime: '2023-10-26 15:45'
  },
  {
    id: 'ORD-20231025-012',
    customerId: 'c3',
    customerName: '王强',
    vehicleModel: 'BMW X3 xDrive30i',
    amount: 350000,
    status: OrderStatus.COMPLETED,
    updateTime: '2023-10-25 09:00'
  }
];

export const PRODUCTS = [
  { id: 'p1', name: '极速贷', tags: ['秒批', '低利率'], rate: 0.045 },
  { id: 'p2', name: '轻松供', tags: ['低首付', '超长贷'], rate: 0.055 },
  { id: 'p3', name: '5050气球贷', tags: ['尾款产品'], rate: 0.038 },
];
