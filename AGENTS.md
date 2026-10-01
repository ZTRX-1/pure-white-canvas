<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Keep editorial content previews in a shared posts module and card component so Home and Conteúdos stay synchronized; duplicated entries create mismatched links and text.
- Keep individual service pages on the existing shared detail component with per-service presentation data; this preserves route architecture while allowing distinct editorial layouts.
- Keep internal operational records in Lovable Cloud tables with role-based RLS and private document storage; the browser is only a presentation layer, never an authorization boundary.
- Keep the existing internal child URLs under the shared internal parent, which owns the unified operational workspace; avoids duplicate mock workflows.
- Keep the initial master access allowlist in a locked Cloud table and claim its admin role only for a verified account; this permits a secure first administrator without client-side role assignment.
