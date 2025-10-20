export const useTableStyles = () => {
  return {
    table: {
      container: 'bg-white rounded-xl shadow-lg overflow-hidden',
      wrapper: 'overflow-x-auto',
      base: 'min-w-full divide-y divide-gray-200',
      head: 'bg-gradient-to-r from-gray-50 to-gray-100',
      body: 'bg-white divide-y divide-gray-200',
    },
    th: 'px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider',
    tr: 'hover:bg-gray-50 transition-colors duration-150',
    td: {
      base: 'px-6 py-4 text-sm',
      nowrap: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
      truncate: 'px-6 py-4 text-sm text-gray-600 max-w-xs truncate',
      muted: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
    },
    badge: {
      base: 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    },
  }
}