<template>
  <div class="bg-white w-full pb-20">
    <div class="push-center flex flex-col gap-8 justify-center">
      <h1 class="heading-lg heading-padding font-audiowide bg-part-white">Skills</h1>

      <div class="overflow-x-auto w-full">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b-2 border-neutral-300">
              <th class="px-4 py-3 text-xl font-bold text-secondary-600">Skill</th>
              <th class="px-4 py-3 text-xl font-bold text-secondary-600 w-40 md:w-56">Experience Level</th>
              <th class="px-4 py-3 text-xl font-bold text-secondary-600">Related Experience</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in skills" :key="row.skill" class="border-b border-neutral-200">
              <td class="px-4 py-4 font-bold text-neutral-900">{{ row.skill }}</td>
              <td class="px-4 py-4">
                <span class="inline-block px-2 py-1 rounded-md text-sm font-bold whitespace-nowrap"
                  :class="levelClass(row.level)">{{ row.level }}</span>
              </td>
              <td class="px-4 py-4 text-neutral-700">{{ row.experience }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  { skill: 'Node.js, TypeScript / JavaScript', level: 'Advanced', experience: 'Enterprise software & web apps; stock trading bots & systems; automation / web crawlers' },
  { skill: 'Backend Development', level: 'Advanced', experience: 'E-invoice service (Java Quarkus); native SDK packaging for Flutter; legacy system modernization' },
  { skill: 'Frontend Development', level: 'Advanced', experience: 'Offline-first apps; mobile apps; embedded UI' },
  { skill: 'System Architecture', level: 'Intermediate', experience: 'High-availability fintech service; security framework for cross-system communication; microservices mentoring' },
  { skill: 'UI/UX Design', level: 'Intermediate', experience: 'MCPLUS internal system & mobile app; LMS UI/UX' },
  { skill: 'DevOps', level: 'Intermediate', experience: 'Enterprise & self-hosted CI/CD pipelines' },
  { skill: 'RelationalDB (MySQL & PostgreSQL)', level: 'Intermediate', experience: 'most used storage; performance tuning; time-based partitioning' },
  { skill: 'PHP', level: 'Intermediate', experience: 'Legacy accounting ERP system; school & freelance projects' },
  { skill: 'Java', level: 'Beginner', experience: 'E-invoicing system; Android (Kotlin) plugins' },
  { skill: 'MongoDB', level: 'Beginner', experience: 'Non-relational & horizontally scaling data; e-invoicing system' },
];

function levelClass(level: string) {
  switch (level) {
    case 'Advanced': return 'bg-primary-500/20 text-primary-700';
    case 'Intermediate': return 'bg-secondary-500/20 text-secondary-700';
    default: return 'bg-neutral-200 text-neutral-600';
  }
}
</script>
