import ActivityFeed from "@/admin/components/ActivityFeed";
import { AdminTitle } from "@/admin/components/adminTitle";
import Chart from "@/admin/components/Chart";
import QuickActions from "@/admin/components/QuickActions";
import StatCard from "@/admin/components/StatCard";
import { useUsers } from "@/admin/hooks/useUsers";
import { TrendingUp, Users } from "lucide-react";



const chartData = [
    { label: 'Desktop', value: 65 },
    { label: 'Mobile', value: 28 },
    { label: 'Tablet', value: 7 },
];

const performanceData = [
    { label: 'Page Views', value: 24567 },
    { label: 'Sessions', value: 18234 },
    { label: 'Users', value: 12847 },
    { label: 'Bounce Rate', value: 23 },
];



export const AdminDashboardPage = () => {
    const { usersQuery } = useUsers();

    const users = usersQuery.data || [];
    const activeUsersCount = users.filter(u => u.activo).length;
    const inactiveUsersCount = users.length - activeUsersCount;

    const stats = [
        {
            title: 'Usuarios Registrados',
            value: users.length.toLocaleString(),
            change: '+12.5% desde el mes pasado',
            changeType: 'positive' as const,
            icon: Users,
            color: 'bg-blue-800'
        },
        {
            title: 'Usuarios Activos',
            value: activeUsersCount.toLocaleString(),
            change: '+8.2% desde el mes pasado',
            changeType: 'positive' as const,
            icon: Users,
            color: 'bg-emerald-600'
        },
        {
            title: 'Usuarios Inactivos',
            value: inactiveUsersCount.toLocaleString(),
            change: 'Refleja cuentas suspendidas',
            changeType: 'positive' as const,
            icon: Users,
            color: 'bg-red-700'
        },
        {
            title: 'Tasa de Conversión',
            value: '3.24%',
            change: '+0.3% desde el mes pasado',
            changeType: 'positive' as const,
            icon: TrendingUp,
            color: 'bg-orange-500'
        }
    ];

    return (
        <>

            <AdminTitle title="Panel Administrativo" subtitle="Gestiona usuarios" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Charts and Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 space-y-6">
                    <Chart title="Traffic Sources" data={chartData} />
                    <Chart title="Performance Metrics" data={performanceData} />
                </div>

                <div className="space-y-6">
                    <ActivityFeed />
                    <QuickActions />
                </div>
            </div>




        </>
    )
}