import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
interface TestimonialProps {
  onContinue: () => void;
}
export default function Testimonial({
  onContinue
}: TestimonialProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            O plano está pronto! ✨
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Veja o que outros donos dizem sobre o resultado:
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border-2 border-border space-y-4">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 text-warning fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>)}
          </div>
          
          <h3 className="text-xl font-bold">Nova abordagem para a calma</h3>
          
          <p className="text-muted-foreground">
            "Esta foi uma maneira nova para mim de aprender a ajudar meu cachorro a
            ficar calmo. Ainda não terminamos, mas já vi grandes melhorias com
            nosso Pastor Alemão de 8 anos que tinha algum treinamento mas
            lutava com reatividade."
          </p>
          
          <div className="flex items-center gap-3 pt-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <p className="font-bold">Ernesto</p>
              <p className="text-sm text-muted-foreground">Dono verificado</p>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent/20 text-center">
          <p className="text-2xl font-bold text-accent mb-2">Mais de 25.000 donos de cães</p>
          <p className="text-muted-foreground">
            escolheram Canino Obediente 360° para transformar o comportamento dos seus cachorros
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={onContinue} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
            Continuar
          </Button>
        </div>
      </div>
    </motion.div>;
}