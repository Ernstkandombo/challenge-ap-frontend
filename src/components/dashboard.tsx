"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Types for API responses
// School for the table
interface School {
  rank: number
  name: string
  registrations: number
  programme: string
  academicYear: string
}
// Programme chart data
interface ProgrammeData {
  programme: string
  count: number
}
// Academic year chart data
interface AcademicYearData {
  year: string
  count: number
}

export type { School };

interface DashboardProps {
  totalRegistrations: number;
  programmeData: ProgrammeData[];
  academicYearData: AcademicYearData[];
  schoolsData: School[];
}

export default function Dashboard({
  totalRegistrations,
  programmeData,
  academicYearData,
  schoolsData,
}: DashboardProps) {
  // Sort and get top 10 schools
  const filteredSchoolsData = schoolsData
    .sort((a, b) => b.registrations - a.registrations) // Sort by registrations in descending order
    .slice(0, 10) // Top 10 schools
    .map((school) => ({
      name: school.name,
      registrations: school.registrations
    }));

  // Chart configurations
  const programmeChartConfig = {
    count: {
      label: "Registrations",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-full md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold">{totalRegistrations.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4">
            <CardHeader>
              <CardTitle>Registrations by Programme</CardTitle>
              <CardDescription>Distribution across all programmes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={programmeChartConfig} className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart accessibilityLayer data={programmeData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="programme"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          formatter={(value) => [`${value.toLocaleString()} students`, "Registrations"]}
                        />
                      }
                    />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-3">
            <CardHeader>
              <CardTitle>Registrations by Academic Year</CardTitle>
              <CardDescription>Year-over-year growth</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart accessibilityLayer data={academicYearData}>
                    <CartesianGrid vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      tickLine={false} 
                      tickMargin={10} 
                      axisLine={false}
                      tickFormatter={(value) => value.toString()}
                      width={60}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`}
                      width={40}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          formatter={(value) => [`${value.toLocaleString()} students`, "Registrations"]}
                        />
                      }
                    />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Secondary Schools</CardTitle>
              <CardDescription>Schools with the highest number of registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <DataTable columns={columns} data={filteredSchoolsData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
      
  )
}
