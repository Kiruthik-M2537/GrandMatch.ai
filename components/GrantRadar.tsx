"use client";

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface GrantRadarProps {
    grantRequirements: { subject: string; A: number; B: number; fullMark: number }[];
    userProfile: { subject: string; A: number; fullMark: number }[];
}

export default function GrantRadar({ grantRequirements, userProfile }: GrantRadarProps) {
    // Combine data for the chart
    // We need an array of objects where each object has the subject, the grant value (A), and the user value (B)
    const chartData = grantRequirements.map((req) => {
        const userReq = userProfile.find((p) => p.subject === req.subject);
        return {
            subject: req.subject,
            A: req.A,
            B: userReq ? userReq.A : 0,
            fullMark: req.fullMark,
        };
    });

    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Grant Req"
                        dataKey="A"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        fill="#94a3b8"
                        fillOpacity={0.2}
                    />
                    <Radar
                        name="You"
                        dataKey="B"
                        stroke="#2563eb"
                        strokeWidth={2}
                        fill="#2563eb"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
