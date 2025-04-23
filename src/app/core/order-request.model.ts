export interface OrderItem {
    beanId: string;
    quantity: number;
  }
  
  export interface OrderRequest {
    firstName: string;
    surname: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    county?: string;
    postcode: string;
    orderItems: OrderItem[];
  }
