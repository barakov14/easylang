export interface Submission {
  id: number
  text?: string
  grade?: number
  rejected: number
  pages_done?: number
  status: string
}

export interface SendSubmissionToEditor {
  text: string
  pages_done: number
}

export interface SubmissionComment {
  comment: string
}

export interface SubmissionApprove {
  grade: number
}
