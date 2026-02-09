import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <motion.div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl border border-white/10 shadow-xl bg-gradient-to-l from-midnight to-navy overflow-hidden"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute z-10 top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition"
          aria-label="Close"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="Close" />
        </button>
        <div className="shrink-0 w-full max-h-[220px] sm:max-h-[260px] overflow-hidden bg-black/20">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top rounded-t-2xl"
          />
        </div>
        <div className="p-5 overflow-y-auto flex-1 min-h-0">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p className="mb-3 font-normal text-neutral-400">{subDesc}</p>
          ))}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg size-10 hover-animation"
                />
              ))}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
            >
              View Project <img src="assets/arrow-up.svg" className="size-4" alt="" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
