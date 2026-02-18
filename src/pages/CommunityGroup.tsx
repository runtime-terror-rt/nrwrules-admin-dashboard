import { Trash2, Users, ShieldAlert } from 'lucide-react'
import { PageHeader } from "../components";
import { 
  useGetCommunityGroupsQuery, 
  useDeleteCommunityGroupMutation, 
  useToggleGroupStatusMutation 
} from "../redux/features/api/admin/communityGroup";
import SkeletonLoading from "@/components/SkeletonLoading";
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export function CommunityGroup() {
  const { data: response, isLoading } = useGetCommunityGroupsQuery({});
  const [deleteGroup] = useDeleteCommunityGroupMutation();
  const [toggleStatus] = useToggleGroupStatusMutation();

  const groups = response?.data || [];

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGroup(id).unwrap();
          toast.success('Group deleted successfully');
        } catch (error: any) {
          toast.error(error?.data?.message || 'Failed to delete group');
        }
      }
    });
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success('Group status updated');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  return (
    <>
      <PageHeader
        title="Community Groups"
        subtitle="Community · Management"
        description="Manage community groups and their members."
      />

      <div className="mt-8">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-white">
            <div>
              <h3 className="text-xl font-bold text-gray-900!">All Community Groups</h3>
              <p className="text-gray-400 text-xs mt-1">Found {groups.length} active communities</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#FFF3E0]">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-gray-800 uppercase tracking-widest">Group Details</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-800 uppercase tracking-widest">Stage</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-800 uppercase tracking-widest text-center">Members</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-800 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-gray-800 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-10 text-center">
                      <SkeletonLoading count={3} />
                    </td>
                  </tr>
                ) : groups.length > 0 ? (
                  groups.map((group: any) => (
                    <tr key={group.id} className="group hover:bg-gray-50/80 transition-all duration-200">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-sm">
                            <Users size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-rose-500 transition-colors uppercase">{group.name}</p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{group.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-purple-100">
                          {group.stage}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-bold text-gray-900">{group.member_count}</span>
                          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Active Souls</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          group.is_active 
                            ? 'bg-green-50 text-green-600 border-green-100' 
                            : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}>
                          {group.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(group.id)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                              group.is_active
                                ? 'border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 shadow-lg shadow-rose-50'
                                : 'border-sky-200 text-sky-600 hover:bg-sky-600 hover:text-white hover:border-sky-600 shadow-lg shadow-sky-50'
                            }`}
                          >
                            {group.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDelete(group.id)}
                            className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-all hover:scale-110"
                            title="Delete Group"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                          <ShieldAlert size={32} />
                        </div>
                        <p className="text-gray-500 font-medium">No groups found in the digital ether.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityGroup;
