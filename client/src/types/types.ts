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
  User?: User
}

export interface VacationRequestForm {
  startDate: string
  endDate: string
  reason?: string
}

export interface StatusUpdateForm {
  status: 'Approved' | 'Rejected'
  comments?: string
}