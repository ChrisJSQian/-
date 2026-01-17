export enum View {
  LOGIN = 'LOGIN',
  WORKBENCH = 'WORKBENCH',
  CUSTOMER_LIST = 'CUSTOMER_LIST',
  CUSTOMER_DETAIL = 'CUSTOMER_DETAIL',
  WIZARD = 'WIZARD',
  ORDER_LIST = 'ORDER_LIST',
  ORDER_DETAIL = 'ORDER_DETAIL',
  TOOLS = 'TOOLS'
}

export enum CustomerTag {
  WHITELIST = '白名单',
  REGULAR = '老客户',
  VIP = 'VIP',
  NEW = '新客'
}

export interface Customer {
  id: string;
  name: string;
  gender: 'male' | 'female';
  phone: string;
  tags: CustomerTag[];
  idCard: string;
}

export enum OrderStatus {
  PENDING = '审批中',
  APPROVED = '待签约',
  REJECTED = '已拒绝',
  COMPLETED = '已放款',
  DRAFT = '草稿'
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  vehicleModel: string;
  amount: number;
  status: OrderStatus;
  updateTime: string;
  stagnationTime?: string; // e.g., "已停留 2小时"
}

export enum WizardStep {
  PRODUCT = 1,
  CALCULATOR = 2,
  PRE_CHECK = 3,
  UPLOAD = 4
}
