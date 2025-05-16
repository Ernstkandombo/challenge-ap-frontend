import Dashboard from "@/components/dashboard";

// Types for API responses
interface School {
  rank: number;
  name: string;
  registrations: number;
  programme: string;
  academicYear: string;
}
interface ProgrammeData {
  programme: string;
  count: number;
}
interface AcademicYearData {
  year: string;
  count: number;
}

interface ApiProgrammeItem {
  programme: string;
  total: number;
}

interface ApiYearItem {
  year: string;
  total: number;
}

interface ApiSchoolItem {
  school: string;
  total: number;
}

export default async function Home() {
  let totalRegistrations = 0;
  let programmeData: ProgrammeData[] = [];
  let academicYearData: AcademicYearData[] = [];
  let schoolsData: School[] = [];
  let error = null;

  try {
    const [total, byProgramme, byYear, bySchool] = await Promise.all([
      fetch("http://127.0.0.1:8000/api/total-registrations").then(res => res.json()),
      fetch("http://127.0.0.1:8000/api/registrations-by-programme").then(res => res.json()),
      fetch("http://127.0.0.1:8000/api/registrations-by-year").then(res => res.json()),
      fetch("http://127.0.0.1:8000/api/registrations-by-school").then(res => res.json()),
    ]);
    console.log('total', total);
    console.log('byProgramme', byProgramme);
    console.log('byYear', byYear);
    console.log('bySchool', bySchool);
    totalRegistrations = total.total_registrations || 0;
    programmeData = Array.isArray(byProgramme.registrations) ? byProgramme.registrations.map((item: ApiProgrammeItem) => ({
      programme: item.programme,
      count: item.total
    })) : [];
    academicYearData = Array.isArray(byYear.registrations) ? byYear.registrations.map((item: ApiYearItem) => ({
      year: item.year,
      count: item.total
    })) : [];
    schoolsData = Array.isArray(bySchool.registrations) ? bySchool.registrations.map((item: ApiSchoolItem, index: number) => ({
      rank: index + 1,
      name: item.school,
      registrations: item.total,
      programme: '', // These will be populated by the backend
      academicYear: '' // These will be populated by the backend
    })) : [];
  } catch {
    error = "Failed to load dashboard data.";
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold">Student Registration Dashboard</h1>
      <p className="text-lg">Welcome to the Student Registration Dashboard</p>
      <main className="flex flex-col items-center justify-center h-screen p-6">
        <Dashboard
          totalRegistrations={totalRegistrations}
          programmeData={programmeData}
          academicYearData={academicYearData}
          schoolsData={schoolsData}
        />
      </main>
    </div>
  );
}
