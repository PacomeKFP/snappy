export const GeneralTab = () => (
  <div className="space-y-6">
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800 dark:shadow-dark">
      <h3 className="text-lg font-medium text-gray-900">Profile</h3>
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              placeholder="johndoe"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            About
          </label>
          <div className="mt-1">
            <textarea
              rows={3}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              placeholder="Write a few sentences about yourself..."
            />
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-end space-x-3">
      <button
        type="button"
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Save
      </button>
    </div>
  </div>
);
