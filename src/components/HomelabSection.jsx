import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Shield } from 'lucide-react';

const HomelabCard = ({ item, index }) => {
    const icons = {
        "Home Server Setup": <Server size={32} className="text-blue-400" />,
        "Local AI Models": <Cpu size={32} className="text-purple-400" />,
        "Network Security": <Shield size={32} className="text-green-400" />
    };

    const CardContent = () => (
        <>
            <div className="card-icon">
                {icons[item.title] || <Server size={32} />}
            </div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
            <div className="tech-stack">
                {item.tech.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                ))}
            </div>
        </>
    );

    const cardClasses = "glass-card homelab-card block h-full";

    if (item.link) {
        return (
            <motion.a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClasses} hover:bg-white/10 transition-colors cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
            >
                <CardContent />
            </motion.a>
        );
    }

    return (
        <motion.div
            className={cardClasses}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
        >
            <CardContent />
        </motion.div>
    );
};

const HomelabSection = ({ data }) => {
    return (
        <div className="homelab-grid">
            {data.map((item, index) => (
                <HomelabCard key={item.id} item={item} index={index} />
            ))}
        </div>
    );
};

export default HomelabSection;
