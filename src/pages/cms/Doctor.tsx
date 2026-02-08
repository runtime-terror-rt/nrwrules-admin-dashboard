import React, { useState } from 'react';
import { Edit, Edit2, Plus, Trash2 } from 'lucide-react';
import { Button, PageHeader,Icon } from '@/components';

interface Doctor {
  id: number;
  name: string;
  speciality: string;
  schedule: string;
  day: string;
  photo: string;
  active: boolean;
}

export function DoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: 'Dr. Maria Schmidt',
      speciality: 'Obstetrics & Gynaecology',
      schedule: '7:00 PM EST',
      day: 'Thursday',
      photo: '/doctor-photo.jpg',
      active: true,
    },
    {
      id: 2,
      name: 'Dr. Maria Schmidt',
      speciality: 'Obstetrics & Gynaecology',
      schedule: '7:00 PM EST',
      day: 'Thursday',
      photo: '/doctor-photo.jpg',
      active: true,
    },
    {
      id: 3,
      name: 'Dr. Maria Schmidt',
      speciality: 'Obstetrics & Gynaecology',
      schedule: '7:00 PM EST',
      day: 'Thursday',
      photo: '/doctor-photo.jpg',
      active: true,
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openAddForm = () => {
    setSelectedDoctor({
      id: Date.now(), // temporary id
      name: '',
      speciality: '',
      schedule: '',
      day: '',
      photo: '',
      active: true,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (doctor: Doctor) => {
    setSelectedDoctor({ ...doctor });
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!selectedDoctor) return;

    if (selectedDoctor.id === Date.now()) {
      // new doctor
      setDoctors((prev) => [...prev, selectedDoctor]);
    } else {
      // update existing
      setDoctors((prev) =>
        prev.map((d) => (d.id === selectedDoctor.id ? selectedDoctor : d))
      );
    }

    setIsFormOpen(false);
    setSelectedDoctor(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this doctor?')) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      {/* Header */}
    <PageHeader
        title="Doctor"
        subtitle="CMS · Doctor"
        description="Manage Doctor information and activities for your website’s users. "
        action={
          <Button onClick={() => openAddForm()} className="bg-[#E91E63] w-full sm:w-auto">
       
            <Plus size={18}/>
           Add Doctor
          </Button>
        }
      />

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Crect fill="%23e5e7eb" width="128" height="128"/%3E%3Ctext x="50%%" y="50%%" font-size="48" fill="%239ca3af" text-anchor="middle" dy=".3em"%3E👤%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditForm(doctor)}
                  className="text-cyan-500 hover:text-cyan-600 p-1 transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="text-cyan-500 hover:text-red-500 p-1 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="font-medium text-gray-800 mb-1">{doctor.name}</h3>
            <p className="text-cyan-600 text-sm font-medium mb-2">{doctor.speciality}</p>
            <p className="text-gray-600 text-sm">
              {doctor.day}: {doctor.schedule}
            </p>
          </div>
        ))}
      </div>

      {/* Form Panel (slides in / appears when editing or adding) */}
      {isFormOpen && selectedDoctor && (
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-xl text-cyan-500 font-light">Doctor's Details</h2>
            <div className="flex gap-3 self-end sm:self-auto">
              <button
                onClick={closeForm}
                className="px-6 py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left – Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">
                  Doctor Name
                </label>
                <input
                  type="text"
                  value={selectedDoctor.name}
                  onChange={(e) =>
                    setSelectedDoctor({ ...selectedDoctor, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="Dr. Maria Schmidt"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">
                  Speciality
                </label>
                <input
                  type="text"
                  value={selectedDoctor.speciality}
                  onChange={(e) =>
                    setSelectedDoctor({ ...selectedDoctor, speciality: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="Obstetrics & Gynaecology"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Service Schedule
                  </label>
                  <input
                    type="text"
                    value={selectedDoctor.schedule}
                    onChange={(e) =>
                      setSelectedDoctor({ ...selectedDoctor, schedule: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="7:00 PM EST"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">
                    Service Day
                  </label>
                  <input
                    type="text"
                    value={selectedDoctor.day}
                    onChange={(e) =>
                      setSelectedDoctor({ ...selectedDoctor, day: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Thursday"
                  />
                </div>
              </div>
            </div>

            {/* Right – Photo + Status */}
            <div className="space-y-7">
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">
                  Doctor Photo
                </label>
                <div className="space-y-4">
                  <div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={selectedDoctor.photo || ''}
                      alt="Doctor preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"%3E%3Crect fill="%23e5e7eb" width="160" height="160"/%3E%3Ctext x="50%%" y="50%%" font-size="64" fill="%239ca3af" text-anchor="middle" dy=".3em"%3E👤%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center hover:border-cyan-400 transition-colors cursor-pointer">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-cyan-600">Click or drag image here</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-3 font-medium">Status</label>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDoctor.active}
                      onChange={(e) =>
                        setSelectedDoctor({ ...selectedDoctor, active: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                  <span className="text-sm text-gray-600">Active status</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}