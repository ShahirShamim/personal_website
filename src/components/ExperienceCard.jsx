import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const ExperienceCard = ({ job, index }) => {
    return (
        <Motion.div
            className="glass-card experience-card p-6 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
        >
            <div className="experience-header-wrapper">
                <div className="experience-main-info">
                    {job.logo ? (
                        <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                            <img
                                src={job.logo}
                                alt={`${job.company} logo`}
                                className="w-full h-full object-contain rounded-lg"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    e.target.parentElement.classList.add('fallback-icon');
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                            <span className="text-blue-400 font-bold text-lg">{job.company.charAt(0)}</span>
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-bold text-white">{job.role}</h3>
                        <h4 className="text-lg text-blue-300">{job.company}</h4>
                    </div>
                </div>
                <div className="experience-meta-info">
                    <div className="meta-date">
                        <Calendar size={14} />
                        <span>{job.period}</span>
                    </div>
                    <div className="meta-location">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                    </div>
                </div>
            </div>

            <ul className="space-y-3 text-gray-300 pl-4 border-l-2 border-blue-500/30 ml-6">
                {job.description.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)] shrink-0"></span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </Motion.div>
    );
};

export default ExperienceCard;
