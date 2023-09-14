import React from 'react'

const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'))
const UserManagement = React.lazy(() => import('./pages/userManagement'))
const DonationManagement = React.lazy(() => import('./pages/donationTemporary'))
const UserManagementDetail = React.lazy(() => import('./pages/userManagement/userManagementDetail'))
const DonationTemporaryManagemnetDetail = React.lazy(
  () => import('./pages/donationTemporary/donationTemporaryManagementDetail'),
)
const DonationManagementDetail = React.lazy(() => import('./pages/donationDetail/donationManagementDetail'))
const ProjectUpload = React.lazy(() => import('./pages/projectUpload/ProjectUpload'))
const Project = React.lazy(() => import('./pages/projectManagement/index'))
const ProjectDetail = React.lazy(() => import('./pages/projectManagement/projectDetail'))
const Reservation = React.lazy(() => import('./pages/reservation/Reservation'))
const ReservationDetail = React.lazy(() => import('./pages/reservation/ReservationDetail'))
const Space = React.lazy(() => import('./pages/space/Space'))
const Banner = React.lazy(() => import('./pages/banner/Banner'))
const BannerDetail = React.lazy(() => import('./pages/bannerDetail/BannerDetail'))
const Exhibition = React.lazy(() => import('./pages/exhibition/Exhibition'))
const ExhibitionDetail = React.lazy(() => import('./pages/exhibitionDetail/ExhibitionDetail'))
const Recommend = React.lazy(() => import('./pages/recommend/Recommend'))
const Keyword = React.lazy(() => import('./pages/keyword/Keyword'))
const DonationTemporaryManagementPost = React.lazy(() => import('./pages/donationTemporary/donationPost'))
const routes = [
  {path: '/', name: 'Home'},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/user-management', name: 'UserManagement', component: UserManagement},
  {path: '/project-management', name: 'ProjectManagement', component: Project},
  {path: '/project-management/:id', name: 'ProjectManagement', component: ProjectDetail},
  {path: '/project-management/registration', name: 'ProjectManagement', component: ProjectUpload},
  {path: '/project-management/donation/:id', name: 'DonationManagementDetail', component: DonationManagementDetail},
  {path: '/user-management/:id', name: 'UserManagement', component: UserManagementDetail},
  {path: '/donation-temporary', name: 'DonationManagement', component: DonationManagement},
  {path: '/donation-temporary/:id', name: 'DonationManagement', component: DonationTemporaryManagemnetDetail},
  {path: '/donation-temporary/registration/:id', name: DonationManagement, component: DonationTemporaryManagementPost},
  {path: '/reservation', name: 'Reservation', component: Reservation},
  {path: '/reservation/:id', name: 'Reservation', component: ReservationDetail},
  {path: '/space', name: 'Space', component: Space},
  {path: '/banner', name: 'Banner', component: Banner},
  {path: '/banner/new', name: 'BannerDetail', component: BannerDetail, props: {isNew: true}},
  {path: '/banner/:id', name: 'BannerDetail', component: BannerDetail, props: {isNew: false}},
  {path: '/exhibition', name: 'Exhibition', component: Exhibition},
  {path: '/exhibition/new', name: 'ExhibitionDetail', component: ExhibitionDetail, props: {isNew: true}},
  {path: '/exhibition/:id', name: 'ExhibitionDetail', component: ExhibitionDetail, props: {isNew: false}},
  {path: '/recommend', name: 'recommend', component: Recommend},
  {path: '/keyword', name: 'keyword', component: Keyword},
]

export default routes
