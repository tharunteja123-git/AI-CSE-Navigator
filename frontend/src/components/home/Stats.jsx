const stats = [
  { value: '50,000+', label: 'Students Guided' },
  { value: '25+', label: 'Career Paths' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '500+', label: 'Companies Covered' },
]
export default function Stats() {
  return (
    <section className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {stats.map(s => (
          <div key={s.label}>
            <div className="text-4xl font-extrabold">{s.value}</div>
            <div className="text-indigo-200 mt-1 text-sm font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
