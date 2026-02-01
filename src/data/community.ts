/** Community Monitoring stats from Figma */
export const communityStats = [
  { label: 'Total Posts', value: 0 },
  { label: 'Total Comments', value: 0 },
  { label: 'Total Likes', value: 0 },
  { label: 'Reported Posts', value: 0 },
]

/** State-based filter tabs: clicking sets filter state. Active = not reported, Inactive = reported. */
export const communityFilterTabs = [
  { id: 'all', label: 'All Posts' },
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'reported', label: 'Reported' },
]

export interface CommentEntry {
  id: string
  author: string
  content: string
  timestamp: string
}

export interface CommunityPost {
  id: string
  author: string
  timestamp: string
  content: string
  comments: number
  likes: number
  reported?: boolean
  /** Who liked — shown in details */
  likedBy: string[]
  /** Comment list — shown in details, delete per comment */
  commentEntries: CommentEntry[]
}

export const communityPosts: CommunityPost[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    timestamp: '2026-01-14 10:30 AM',
    content:
      "Just hit week 20! Feeling the baby move more and more each day. It's such an amazing feeling! Any tips for dealing with back pain?",
    comments: 2,
    likes: 24,
    likedBy: ['Maria G.', 'Emily C.', 'Jessica W.', 'Amanda B.', 'Lisa K.'],
    commentEntries: [
      {
        id: 'c1-1',
        author: 'Maria G.',
        content: 'Try a pregnancy pillow! It helped me so much.',
        timestamp: '2026-01-14 11:00 AM',
      },
      {
        id: 'c1-2',
        author: 'Emily C.',
        content: 'Heat pad on low setting works wonders.',
        timestamp: '2026-01-14 11:15 AM',
      },
    ],
  },
  {
    id: '2',
    author: 'Mario Garcia',
    timestamp: '2026-01-14 09:15 AM',
    content:
      "Recovery after cesarean is no joke! Taking it slow and following all doctor's orders. Thank you to this community for all the support.",
    comments: 2,
    likes: 18,
    likedBy: ['Sarah J.', 'Jessica W.', 'Amanda B.'],
    commentEntries: [
      {
        id: 'c2-1',
        author: 'Sarah J.',
        content: 'You got this! Rest when you can.',
        timestamp: '2026-01-14 09:45 AM',
      },
      {
        id: 'c2-2',
        author: 'Jessica W.',
        content: 'Sending healing vibes your way.',
        timestamp: '2026-01-14 10:00 AM',
      },
    ],
  },
  {
    id: '3',
    author: 'Emily Chen',
    timestamp: '2026-01-14 08:00 AM',
    content:
      'Has anyone else experienced severe morning sickness in the second trimester? I thought it was supposed to get better...',
    comments: 2,
    likes: 22,
    likedBy: ['Maria G.', 'Sarah J.', 'Amanda B.'],
    commentEntries: [
      {
        id: 'c3-1',
        author: 'Maria G.',
        content: 'I had it until week 28. Ginger tea helped a bit.',
        timestamp: '2026-01-14 08:30 AM',
      },
      {
        id: 'c3-2',
        author: 'Sarah J.',
        content: 'Talk to your OB about meds — they can help.',
        timestamp: '2026-01-14 08:45 AM',
      },
    ],
  },
  {
    id: '4',
    author: 'Jessica Williams',
    timestamp: '2026-01-13 06:45 PM',
    content:
      "Breastfeeding journey has been challenging but so rewarding. Don't give up, mamas! It does get easier.",
    comments: 2,
    likes: 35,
    likedBy: ['Sarah J.', 'Emily C.', 'Maria G.', 'Amanda B.'],
    commentEntries: [
      {
        id: 'c4-1',
        author: 'Sarah J.',
        content: 'Needed to hear this today. Thank you!',
        timestamp: '2026-01-13 07:00 PM',
      },
      {
        id: 'c4-2',
        author: 'Emily C.',
        content: 'So true — week 6 was my turning point.',
        timestamp: '2026-01-13 07:20 PM',
      },
    ],
  },
  {
    id: '5',
    author: 'Amanda Brown',
    timestamp: '2026-01-13 04:20 PM',
    content:
      'Does anyone have recommendations for prenatal yoga? Looking for something gentle for third trimester.',
    comments: 2,
    likes: 14,
    likedBy: ['Jessica W.', 'Emily C.'],
    commentEntries: [
      {
        id: 'c5-1',
        author: 'Jessica W.',
        content: 'YouTube "prenatal yoga third trimester" — lots of free options!',
        timestamp: '2026-01-13 04:45 PM',
      },
      {
        id: 'c5-2',
        author: 'Emily C.',
        content: 'I did Bloom Yoga online. Very gentle.',
        timestamp: '2026-01-13 05:00 PM',
      },
    ],
  },
  {
    id: '6',
    author: 'Spam Account',
    timestamp: '2026-01-13 02:00 PM',
    content: 'This product changed my life! Buy now at [suspicious link]',
    comments: 0,
    likes: 0,
    reported: true,
    likedBy: [],
    commentEntries: [],
  },
]
