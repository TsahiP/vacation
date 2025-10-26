// User related types
export interface User {
  id: number
  name: string
  email: string
  role: 'Requester' | 'Validator'
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  role: 'Requester' | 'Validator'
}

// Vacation request related types
export interface VacationRequest {
  id: number
  userId: number
  startDate: string
  endDate: string
  reason?: string
  status: 'Pending' | 'Approved' | 'Rejected'
  comments?: string
  created_at: string
  updated_at: string
  destination?: string
  User?: User
}

// back to here and check about omitting optional fields
export interface VacationRequestForm {
  startDate: string
  endDate: string
  reason?: string
  destination?: string
}

export interface StatusUpdateForm {
  status: 'Approved' | 'Rejected'
  comments?: string
}

export interface RequesterView {
  id: number
  startDate: string
  endDate: string
  status: string
  reason?: string,
  destination?: string
  comments?: string
  created_at: string
}