/*
export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Candidate Profiles']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'New candidate profile',
        to: '/candidate-profiles/add',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'List candidate profiles',
        to: '/candidate-profiles',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Email Templates']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'New email template',
        to: '/email/templates/add',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'List email template',
        to: '/email/templates',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Sources']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'New source',
        to: '/sources/add',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'List source',
        to: '/sources',
        icon: 'cil-drop'
      }
    ]
  }
]
*/
export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Candidate Profiles']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'List candidate profiles',
        to: '/candidate-profiles/',
        icon: 'cil-drop'
      }
    ]
  }
]
