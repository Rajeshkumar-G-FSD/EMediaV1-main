export interface Customer {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  priceRange: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  price: string;
  image: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
}

export interface ConsultationRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  weddingDate: string;
  serviceType: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'canceled';
  createdAt: string;
}
