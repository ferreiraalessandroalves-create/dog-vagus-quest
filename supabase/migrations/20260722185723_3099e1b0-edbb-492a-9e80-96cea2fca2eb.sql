
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.quiz_submissions;
DROP POLICY IF EXISTS "Anyone can submit quiz responses" ON public.quiz_submissions;

REVOKE SELECT ON public.quiz_submissions FROM anon, authenticated;

CREATE POLICY "Public can submit quiz responses"
  ON public.quiz_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    user_email IS NOT NULL
    AND length(user_email) > 3
    AND length(user_email) < 255
    AND position('@' in user_email) > 1
  );

CREATE POLICY "Service role can read submissions"
  ON public.quiz_submissions
  FOR SELECT
  TO service_role
  USING (true);
