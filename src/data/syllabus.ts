/**
 * B.Pharm syllabus — Students Corner > Course Syllabus.
 *
 * Source of truth: ipsr_syllabus.json (the corrected export of the old site),
 * copied here as-is. 45 subjects across 8 semesters: 25 link to their PDF;
 * the other 20 had no file on the old site, so pdf is null and the page shows
 * them by name only (muted, not clickable).
 *
 * BP401TT is "Pharmaceutical Organic Chemistry III" — the old site listed it
 * under the same name as BP301TP ("...II").
 *
 * The PDFs live in a personal Google Drive: if its owner changes sharing or
 * leaves, every link breaks at once. Longer term, copy them into the site's
 * own storage.
 */

export type SyllabusSubject = { code: string; name: string; pdf: string | null };
export type SyllabusSemester = { semester: number; title: string; subjects: SyllabusSubject[] };
export type Syllabus = { programme: string; semesters: SyllabusSemester[] };

export const SYLLABUS: Syllabus = {
    programme: 'B.Pharm',
    semesters: [
        {
            semester: 1, title: 'Semester 1', subjects: [
                { code: 'BP101TP', name: 'Human Anatomy and Physiology I', pdf: 'https://drive.google.com/file/d/1XzSNb18w0mOWZh02uVllIeTEZgjZHRMy/view' },
                { code: 'BP102TP', name: 'Pharmaceutical Analysis I', pdf: 'https://drive.google.com/file/d/1aaxP_SeBZ7mn006x739cdG8y7qRHCoQ7/view' },
                { code: 'BP103TP', name: 'Pharmaceutics I', pdf: null },
                { code: 'BP104TP', name: 'Pharmaceutical Inorganic Chemistry', pdf: 'https://drive.google.com/file/d/1HGsLJ_SUIMG94BPV4Di9hwYbAtxiUart/view' },
                { code: 'BP105TP', name: 'Communication Skills', pdf: 'https://drive.google.com/file/d/1ajpw8MLdAYk0ZHLp6inJNCCCjKYXkreN/view' },
                { code: 'BP106TP', name: 'Remedial Biology', pdf: 'https://drive.google.com/file/d/1H_2_VW1UxAnFHMjEDVmMXRwVrzxIR_tm/view' },
                { code: 'BP107TT', name: 'Remedial Mathematics', pdf: null },
            ]
        },
        {
            semester: 2, title: 'Semester 2', subjects: [
                { code: 'BP201TP', name: 'Human Anatomy and Physiology II', pdf: 'https://drive.google.com/file/d/1Y4dSb4zK50XL4Jwwus-4EI2U_IWb9feh/view' },
                { code: 'BP202TP', name: 'Pharmaceutical Organic Chemistry I', pdf: 'https://drive.google.com/file/d/1oQ579WM7OBDcZ18NrqCW7iIHfaUtoPQJ/view' },
                { code: 'BP203TP', name: 'Pharmaceutical Engineering', pdf: 'https://drive.google.com/file/d/19kw_Ke4B_jK7AqVlW9qTdHXdKg5Nwy8C/view' },
                { code: 'BP204TP', name: 'Computer Applications in Pharmacy', pdf: 'https://drive.google.com/file/d/1uL6C93ccHdiJQxR7KTvXEBmtmWWnhyoa/view' },
                { code: 'BP205TT', name: 'Environmental Sciences', pdf: 'https://drive.google.com/file/d/1_B1Pr7gA3lDhfPsbGYW4Pvph-Um9MZSi/view' },
            ]
        },
        {
            semester: 3, title: 'Semester 3', subjects: [
                { code: 'BP301TP', name: 'Pharmaceutical Organic Chemistry II', pdf: 'https://drive.google.com/file/d/13UzBZtYj2tVS2vNV-1VrHtpdQM3NHUbe/view' },
                { code: 'BP302TP', name: 'Physical Pharmaceutics I', pdf: 'https://drive.google.com/file/d/1vh0oJ22Ujipv-Ob-p9VzkglT5h6ZVeUo/view' },
                { code: 'BP303TP', name: 'Biochemistry', pdf: 'https://drive.google.com/file/d/1pisvVwEWTmDxL-iHqiHeneeNqJLdWV7G/view' },
                { code: 'BP304TT', name: 'Pathophysiology', pdf: null },
                { code: 'BP305TP', name: 'Pharmacognosy and Phytochemistry I', pdf: null },
            ]
        },
        {
            semester: 4, title: 'Semester 4', subjects: [
                { code: 'BP401TT', name: 'Pharmaceutical Organic Chemistry III', pdf: 'https://drive.google.com/file/d/1wfrFWGwIC-LCQj6pIuUAyfsk197Hb8cO/view' },
                { code: 'BP402TP', name: 'Medicinal Chemistry I', pdf: 'https://drive.google.com/file/d/1qpCDLJjGGVIQLqa4s6Vzur53PAvwmDt8/view' },
                { code: 'BP403TP', name: 'Physical Pharmaceutics II', pdf: 'https://drive.google.com/file/d/1wH9tFhm8Nz0RgpW7-BaoXQtevNpLLzYw/view' },
                { code: 'BP404TP', name: 'Pharmacology I', pdf: 'https://drive.google.com/file/d/1q9S-RxwwpQw0G7tI-KcDKUGELitMhKtJ/view' },
                { code: 'BP405TT', name: 'Pharmaceutical Jurisprudence', pdf: 'https://drive.google.com/file/d/1RssBgCVne4dRv-s76-oy4hSjQd-sdzt_/view' },
            ]
        },
        {
            semester: 5, title: 'Semester 5', subjects: [
                { code: 'BP501TT', name: 'Medicinal Chemistry II', pdf: 'https://drive.google.com/file/d/1TZ_KJAAuhsMxpW7wZt_5MDlobFT0IdlX/view' },
                { code: 'BP502TP', name: 'Pharmacology II', pdf: null },
                { code: 'BP503TP', name: 'Pharmacognosy and Phytochemistry II', pdf: null },
                { code: 'BP504TP', name: 'Pharmaceutical Microbiology', pdf: null },
                { code: 'BP505TT', name: 'Pharmaceutical Biotechnology', pdf: null },
                { code: 'BP506TP', name: 'Contributor Personality Development Program', pdf: null },
                { code: 'BP507TP', name: 'Integrated Personality Development Course', pdf: null },
            ]
        },
        {
            semester: 6, title: 'Semester 6', subjects: [
                { code: 'BP601TP', name: 'Medicinal Chemistry III', pdf: 'https://drive.google.com/file/d/1z_0I5213r2Lr3tTCm8_1Ub5wwlLYJUQx/view' },
                { code: 'BP602TP', name: 'Pharmacology III', pdf: null },
                { code: 'BP603TP', name: 'Herbal Drug Technology', pdf: null },
                { code: 'BP604TP', name: 'Biopharmaceutics and Pharmacokinetics', pdf: 'https://drive.google.com/file/d/10XDK48FzmBRp7bFuc_jClLHPQuAyGx-q/view' },
                { code: 'BP605TP', name: 'Industrial Pharmacy I', pdf: null },
            ]
        },
        {
            semester: 7, title: 'Semester 7', subjects: [
                { code: 'BP701TP', name: 'Instrumental Methods of Analysis', pdf: 'https://drive.google.com/file/d/1UcS-xm-t1QZwrYltYJ0Fm_VqLAh2sez6/view' },
                { code: 'BP702TT', name: 'Industrial Pharmacy II', pdf: 'https://drive.google.com/file/d/1fySIVY--ZuRH55IgLZ7nEKYXbo549HAr/view' },
                { code: 'BP703TT', name: 'Pharmacy Practice', pdf: null },
                { code: 'BP704TT', name: 'Novel Drug Delivery System', pdf: 'https://drive.google.com/file/d/1tyikqxT-Zs65d368fJgzF0aVBkl9L3yT/view' },
                { code: 'BP705PP', name: 'Practice School', pdf: null },
                { code: 'BP706TT', name: 'Quality Assurance', pdf: 'https://drive.google.com/file/d/1VlPWOe9jpFKtdWOnPK3a7pxL7ksJbyEl/view' },
            ]
        },
        {
            semester: 8, title: 'Semester 8', subjects: [
                { code: 'BP801TT', name: 'Biostatistics and Research Methodology', pdf: null },
                { code: 'BP802TT', name: 'Social and Preventive Pharmacy', pdf: null },
                { code: 'BP809TT', name: 'Cosmetic Science', pdf: null },
                { code: 'BP812TT', name: 'Dietary Supplements and Nutraceuticals', pdf: null },
                { code: 'BP813PP', name: 'Project Work', pdf: null },
            ]
        },
    ],
};