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
        name: 'List candidate profile',
        to: '/candidate-profiles/',
        icon: 'cil-drop'
      }
    ]
  }
]
