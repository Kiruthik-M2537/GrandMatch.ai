"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Feb', withoutGrant: 10, withGrant: 10 },
    { month: 'Mar', withoutGrant: 8, withGrant: 8 },
    { month: 'Apr', withoutGrant: 6, withGrant: 31 }, // Grant Injection (+25L)
    { month: 'May', withoutGrant: 4, withGrant: 29 },
    { month: 'Jun', withoutGrant: 2, withGrant: 27 },
    { month: 'Jul', withoutGrant: 0, withGrant: 25 }, // Bankruptcy point
    { month: 'Aug', withoutGrant: 0, withGrant: 23 },
    { month: 'Sep', withoutGrant: 0, withGrant: 21 },
];

export default function RunwayChart() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    💰 Burn Rate Simulator
                </h3>
                <p className="text-xs text-slate-500">Visualizing Grant Impact on Survival</p>
            </div>

            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorGrant" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorDanger" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis hide domain={[0, 35]} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            formatter={(value, name) => [
                                `₹${value} Lakhs`,
                                name === 'withGrant' ? 'With Grant' : 'Without Grant'
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="withGrant"
                            stroke="#10B981"
                            fillOpacity={1}
                            fill="url(#colorGrant)"
                            strokeWidth={3}
                        />
                        <Area
                            type="monotone"
                            dataKey="withoutGrant"
                            stroke="#EF4444"
                            fillOpacity={1}
                            fill="url(#colorDanger)"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-red-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Death Valley (Jun)
                </span>
                <span className="text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> +8 Months Runway
                </span>
            </div>
        </div>
    );
}
