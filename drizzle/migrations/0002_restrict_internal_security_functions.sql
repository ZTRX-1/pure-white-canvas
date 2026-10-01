REVOKE ALL ON FUNCTION public.has_role(uuid,public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.claim_dhg_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid,public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_dhg_access() TO authenticated;