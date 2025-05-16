"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FilterProps {
  academicYear: string
  setAcademicYear: (value: string) => void
  programme: string
  setProgramme: (value: string) => void
}

export function Filter({ academicYear, setAcademicYear, programme, setProgramme }: FilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="academic-year">Academic Year</Label>
        <Select value={academicYear} onValueChange={setAcademicYear}>
          <SelectTrigger id="academic-year" className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            <SelectItem value="2023-2024">2023-2024</SelectItem>
            <SelectItem value="2022-2023">2022-2023</SelectItem>
            <SelectItem value="2021-2022">2021-2022</SelectItem>
            <SelectItem value="2020-2021">2020-2021</SelectItem>
            <SelectItem value="2019-2020">2019-2020</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="programme">Programme</Label>
        <Select value={programme} onValueChange={setProgramme}>
          <SelectTrigger id="programme" className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Programmes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programmes</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Medicine">Medicine</SelectItem>
            <SelectItem value="Law">Law</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
