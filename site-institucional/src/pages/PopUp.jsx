import { motion, AnimatePresence } from "framer-motion";

export default function Alerta({ mensagem, imagem }) {
  return (
    <AnimatePresence>
      {mensagem && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white flex flex-col py-10 px-10 md:px-20 justify-center gap-2 items-center rounded-2xl border border-[#982546]">

            <motion.img
              src={imagem}
              alt="ícone de alerta"
              className="h-15"
              animate={{
                x: [0, -5, 5, -5, 5, 0], 
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
            
            <h1>{mensagem}</h1>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
