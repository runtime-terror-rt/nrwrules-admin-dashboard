import { PageHeader } from '../components'
import { useGetMyProfileQuery } from '../redux/features/api/user/profile'
import { theme } from '../constants'

export function Profile() {
  const { data, isLoading, error } = useGetMyProfileQuery()

  if (isLoading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (error || !data?.data?.user) {
    return (
      <div className="flex h-[40vh] items-center justify-center text-red-500">
        Failed to load profile data.
      </div>
    )
  }

  const userData = data.data.user
  const profileImage = (userData as any).image

  return (
    <div className="p-5 xl:p-8 min-h-screen">
      <PageHeader
        title="My Profile"
        subtitle="Profile"
        description="View your personal information."
      />

      <div className="mt-8 flex flex-col items-center">
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 mb-8 pb-8 border-b border-gray-100 text-center">
              <div 
                className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full text-4xl font-bold overflow-hidden border-4 border-white shadow-md"
                style={{ backgroundColor: theme.color.activeNav, color: theme.color.primary }}
              >
                {profileImage ? (
                  <img src={profileImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  `${userData.first_name?.[0] || ''}${userData.last_name?.[0] || ''}`
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold !text-gray-900">
                  {userData.first_name} {userData.last_name}
                </h2>
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">First Name</label>
                  <p className="p-3 bg-gray-50 rounded-lg border border-gray-100">{userData.first_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Last Name</label>
                  <p className="p-3 bg-gray-50 rounded-lg border border-gray-100">{userData.last_name}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 block mb-1">Email Address</label>
                <p className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
