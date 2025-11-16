-- Alterar tension_level para aceitar valores decimais
ALTER TABLE public.quiz_submissions 
ALTER COLUMN tension_level TYPE NUMERIC(5,2);