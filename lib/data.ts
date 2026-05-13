import { Faculty } from './types'

export const faculties: Faculty[] = [
  {
    id: 'agriculture',
    name: 'Faculty of Agriculture',
    departments: [
      { id: 'agric-econ', name: 'Agricultural Economics', facultyId: 'agriculture' },
      { id: 'agric-extension', name: 'Agricultural Extension', facultyId: 'agriculture' },
      { id: 'animal-science', name: 'Animal Science', facultyId: 'agriculture' },
      { id: 'crop-science', name: 'Crop Science', facultyId: 'agriculture' },
      { id: 'soil-science', name: 'Soil Science', facultyId: 'agriculture' },
    ],
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    departments: [
      { id: 'edu-admin', name: 'Educational Administration', facultyId: 'education' },
      { id: 'curriculum', name: 'Curriculum Studies', facultyId: 'education' },
      { id: 'guidance', name: 'Guidance & Counselling', facultyId: 'education' },
      { id: 'edu-tech', name: 'Educational Technology', facultyId: 'education' },
    ],
  },
  {
    id: 'environmental',
    name: 'Faculty of Environmental Sciences',
    departments: [
      { id: 'env-science', name: 'Environmental Science', facultyId: 'environmental' },
      { id: 'forestry', name: 'Forestry', facultyId: 'environmental' },
      { id: 'geography', name: 'Geography', facultyId: 'environmental' },
    ],
  },
  {
    id: 'social',
    name: 'Faculty of Social Sciences',
    departments: [
      { id: 'economics', name: 'Economics', facultyId: 'social' },
      { id: 'mass-comm', name: 'Mass Communication', facultyId: 'social' },
      { id: 'political-science', name: 'Political Science', facultyId: 'social' },
      { id: 'sociology', name: 'Sociology', facultyId: 'social' },
    ],
  },
  {
    id: 'basic-sciences',
    name: 'Faculty of Basic Sciences',
    departments: [
      { id: 'biology', name: 'Biological Sciences', facultyId: 'basic-sciences' },
      { id: 'chemistry', name: 'Chemistry', facultyId: 'basic-sciences' },
      { id: 'mathematics', name: 'Mathematics', facultyId: 'basic-sciences' },
      { id: 'physics', name: 'Physics', facultyId: 'basic-sciences' },
    ],
  },
  {
    id: 'community-health',
    name: 'Faculty of Community Health Sciences',
    departments: [
      { id: 'nursing', name: 'Nursing', facultyId: 'community-health' },
      { id: 'public-health', name: 'Public Health', facultyId: 'community-health' },
      { id: 'clinical-sciences', name: 'Clinical Sciences', facultyId: 'community-health' },
    ],
  },
]

export const yearOfStudyOptions = [
  { value: '1', label: 'Year 1' },
  { value: '2', label: 'Year 2' },
  { value: '3', label: 'Year 3' },
  { value: '4', label: 'Year 4' },
  { value: '5', label: 'Year 5 (Postgraduate)' },
]
