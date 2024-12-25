import Image from "next/image";

const TableThree = () => {
  const packageData = [
    {
      name: "",
      price: 0.0,
      invoiceDate: "Jan 13, 2023",
      status: "Paid",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%236366f1' viewBox='0 0 16 16'%3E%3Cpath d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'/%3E%3C/svg%3E",
    },
    {
      name: "Standard Package",
      price: 59.0,
      invoiceDate: "Jan 13, 2023",
      status: "Paid",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%236366f1' viewBox='0 0 16 16'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z'/%3E%3C/svg%3E",
    },
    {
      name: "Business Package",
      price: 99.0,
      invoiceDate: "Jan 13, 2023",
      status: "Unpaid",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%236366f1' viewBox='0 0 16 16'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'/%3E%3C/svg%3E",
    },
    {
      name: "Standard Package",
      price: 59.0,
      invoiceDate: "Jan 13, 2023",
      status: "Pending",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%236366f1' viewBox='0 0 16 16'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'/%3E%3C/svg%3E",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-[#219653]/[0.08] text-[#219653]";
      case "Unpaid":
        return "bg-[#D34053]/[0.08] text-[#D34053]";
      default:
        return "bg-[#FFA70B]/[0.08] text-[#FFA70B]";
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-lg sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="min-w-[100px] px-4 py-4 font-medium text-gray-900">
                Profil image
              </th>
              <th className="min-w-[220px] px-4 py-4 text-left font-medium text-gray-900">
                Username
              </th>
              <th className="min-w-[150px] px-4 py-4 text-left font-medium text-gray-900">
                Description
              </th>
              <th className="min-w-[120px] px-4 py-4 text-left font-medium text-gray-900">
                blabla
              </th>
              <th className="px-4 py-4 text-right font-medium text-gray-900">
                blabla
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="px-4 py-4">
                  <Image
                    src={packageItem.image}
                    alt={packageItem.name}
                    className="h-10 w-10"
                    width={40}
                    height={40}
                  />
                </td>
                <td className="px-4 py-4">
                  <h5 className="font-medium text-gray-900">
                    {packageItem.name}
                  </h5>
                  <p className="text-sm text-gray-600">${packageItem.price}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-gray-700">{packageItem.invoiceDate}</p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3.5 py-1 text-sm font-medium ${getStatusStyle(packageItem.status)}`}
                  >
                    {packageItem.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-3.5">
                    <button className="text-gray-500 transition-colors hover:text-purple-600">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-500 transition-colors hover:text-purple-600">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
