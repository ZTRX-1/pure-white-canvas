CREATE TABLE public.dhg_master_access (
  email text PRIMARY KEY,
  claimed_by uuid UNIQUE,
  claimed_at timestamptz
);
GRANT ALL ON public.dhg_master_access TO service_role;
ALTER TABLE public.dhg_master_access ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.claim_dhg_access() RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public
AS $$
DECLARE
  verified_email text;
  master_access public.dhg_master_access%ROWTYPE;
  matched public.dhg_invitations%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  SELECT email INTO verified_email FROM auth.users
    WHERE id=auth.uid() AND email_confirmed_at IS NOT NULL;
  IF verified_email IS NULL THEN RETURN false; END IF;

  SELECT * INTO master_access FROM public.dhg_master_access
    WHERE lower(email)=lower(verified_email) FOR UPDATE;
  IF FOUND THEN
    IF master_access.claimed_by IS NOT NULL AND master_access.claimed_by <> auth.uid() THEN RETURN false; END IF;
    INSERT INTO public.user_roles(user_id,role) VALUES(auth.uid(),'admin') ON CONFLICT DO NOTHING;
    UPDATE public.dhg_master_access SET claimed_by=auth.uid(), claimed_at=coalesce(claimed_at,now()) WHERE email=master_access.email;
    RETURN true;
  END IF;

  SELECT * INTO matched FROM public.dhg_invitations
    WHERE lower(email)=lower(verified_email) AND role='staff' FOR UPDATE;
  IF NOT FOUND THEN RETURN public.is_staff(auth.uid()); END IF;
  IF matched.claimed_by IS NOT NULL AND matched.claimed_by <> auth.uid() THEN RETURN false; END IF;
  INSERT INTO public.user_roles(user_id,role) VALUES(auth.uid(),'staff') ON CONFLICT DO NOTHING;
  UPDATE public.dhg_invitations SET claimed_by=auth.uid(), claimed_at=coalesce(claimed_at,now()) WHERE id=matched.id;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.claim_dhg_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_dhg_access() TO authenticated;