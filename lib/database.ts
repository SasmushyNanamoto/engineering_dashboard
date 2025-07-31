// Simple in-memory database for development
// In production, this would be replaced with a real database

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface ForumCategory {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface ForumPost {
  id: number;
  title: string;
  content: string;
  user_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
  category?: ForumCategory;
  reply_count?: number;
}

export interface ForumReply {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface FeedbackRequest {
  id: number;
  user_id: number;
  page_section: string;
  content_hash: string;
  feedback_type: 'change_request' | 'accuracy_issue';
  description: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface ContentSection {
  id: number;
  page_name: string;
  section_name: string;
  content_hash: string;
  verified: boolean;
  flagged_count: number;
  created_at: string;
  updated_at: string;
}

export interface UserNote {
  id: number;
  user_id: number;
  page_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// In-memory data storage
const users: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@engineering-dashboard.com',
    role: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const forumCategories: ForumCategory[] = [
  {
    id: 1,
    name: 'Welding Tips',
    description: 'Share welding techniques, tips, and troubleshooting',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Machining',
    description: 'CNC, manual machining, and tooling discussions',
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Safety & PPE',
    description: 'Safety practices and personal protective equipment',
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Materials',
    description: 'Material properties, selection, and handling',
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'General Discussion',
    description: 'General engineering and trade discussions',
    created_at: new Date().toISOString(),
  }
];

const forumPosts: ForumPost[] = [];
const forumReplies: ForumReply[] = [];
const feedbackRequests: FeedbackRequest[] = [];
const contentSections: ContentSection[] = [];
const userNotes: UserNote[] = [];

export function getUsers(): User[] {
  return users;
}

export function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}

export function getUserByUsername(username: string): User | undefined {
  return users.find(user => user.username === username);
}

export function createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): User {
  const newUser: User = {
    ...userData,
    id: users.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

export function getForumCategories(): ForumCategory[] {
  return forumCategories;
}

export function getForumPosts(): ForumPost[] {
  return forumPosts.map(post => ({
    ...post,
    user: getUserById(post.user_id),
    category: forumCategories.find(cat => cat.id === post.category_id),
    reply_count: forumReplies.filter(reply => reply.post_id === post.id).length
  }));
}

export function createForumPost(postData: Omit<ForumPost, 'id' | 'created_at' | 'updated_at'>): ForumPost {
  const newPost: ForumPost = {
    ...postData,
    id: forumPosts.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  forumPosts.push(newPost);
  return newPost;
}

export function getForumReplies(postId: number): ForumReply[] {
  return forumReplies
    .filter(reply => reply.post_id === postId)
    .map(reply => ({
      ...reply,
      user: getUserById(reply.user_id)
    }));
}

export function createForumReply(replyData: Omit<ForumReply, 'id' | 'created_at' | 'updated_at'>): ForumReply {
  const newReply: ForumReply = {
    ...replyData,
    id: forumReplies.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  forumReplies.push(newReply);
  return newReply;
}

export function getFeedbackRequests(): FeedbackRequest[] {
  return feedbackRequests.map(request => ({
    ...request,
    user: getUserById(request.user_id)
  }));
}

export function createFeedbackRequest(requestData: Omit<FeedbackRequest, 'id' | 'created_at' | 'updated_at'>): FeedbackRequest {
  const newRequest: FeedbackRequest = {
    ...requestData,
    id: feedbackRequests.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  feedbackRequests.push(newRequest);
  return newRequest;
}

export function getUserNotes(userId: number): UserNote[] {
  return userNotes.filter(note => note.user_id === userId);
}

export function createUserNote(noteData: Omit<UserNote, 'id' | 'created_at' | 'updated_at'>): UserNote {
  const newNote: UserNote = {
    ...noteData,
    id: userNotes.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  userNotes.push(newNote);
  return newNote;
}

export function updateUserNote(id: number, content: string): UserNote | null {
  const noteIndex = userNotes.findIndex(note => note.id === id);
  if (noteIndex === -1) return null;
  
  userNotes[noteIndex] = {
    ...userNotes[noteIndex],
    content,
    updated_at: new Date().toISOString(),
  };
  return userNotes[noteIndex];
}