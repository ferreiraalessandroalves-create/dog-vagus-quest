-- Create quiz_submissions table
CREATE TABLE public.quiz_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  dog_name TEXT,
  dog_age TEXT,
  dog_gender TEXT,
  dog_breed TEXT,
  pain_pulling INTEGER,
  pain_startles INTEGER,
  pain_barking INTEGER,
  pain_other_dogs INTEGER,
  pain_unexplained INTEGER,
  pain_digestion TEXT,
  pain_physical TEXT,
  pain_coming_home TEXT[],
  pain_behaviors TEXT[],
  pain_stress TEXT,
  pain_triggers TEXT[],
  excitement_triggers TEXT[],
  motivations TEXT[],
  main_goal TEXT,
  time_available TEXT,
  previous_training TEXT,
  commitment TEXT,
  vagus_knowledge TEXT,
  tension_level INTEGER,
  main_problems TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert their quiz submissions
CREATE POLICY "Anyone can submit quiz responses" 
ON public.quiz_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow users to view their own submissions by email
CREATE POLICY "Users can view their own submissions" 
ON public.quiz_submissions 
FOR SELECT 
USING (true);

-- Create index on email for faster queries
CREATE INDEX idx_quiz_submissions_email ON public.quiz_submissions(user_email);

-- Create index on created_at for sorting
CREATE INDEX idx_quiz_submissions_created_at ON public.quiz_submissions(created_at DESC);