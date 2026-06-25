# DECISIONS

> Target ~600 words. Reviewers read this first. Each section is the *judgment*,
> not a description — write it in your own words. The bullets below are reminders
> of what we locked; expand them and delete this note before submitting.

## 1. How tenant + role flow from token to data layer
<!-- Login issues a JWT carrying { userId, tenantId, role }. Auth middleware
verifies it and puts req.auth on the request. Every data query is scoped by
tenantId at the service layer (not ad-hoc per controller) so isolation can't be
forgotten. role gates admin-only routes. -->

## 2. N+1 fix and indexes (field order + why)
<!-- Catalog search resolves Product -> Category. Naive code = 1 query + N
category lookups. Fix: ___ (single aggregation / batched populate / denormalized
name). Indexes: list each, field order, and WHY that order (equality fields
before range/sort; tenantId leads every index). -->

## 3. What we trust from the client cart vs. re-derive on the server
<!-- Trust: productId + quantity (intent). Re-derive on server: price, line
totals, stock availability — re-read from DB at order time. Client never sets
price. -->

## 4. No-oversell guarantee under concurrency, and where it breaks
<!-- Mechanism: ___ (transaction + conditional $inc with stock >= qty guard /
optimistic version). Why it holds for two cashiers on the last unit. Where it
breaks: ___ (e.g. without a transaction, partial decrement across line items;
retry thrashing under heavy contention). -->

## 5. How margin is blocked at the data layer for cashiers
<!-- costPrice lives in product AND is snapshotted into order line items.
Cashier-facing reads project it out at the query layer (not hidden in React), in
both places. A raw cashier token hitting the API never sees cost/margin. -->

## 6. Webhook idempotency + out-of-order handling
<!-- HMAC verified over the raw body with the env secret; forgeries rejected.
Idempotency: unique index on eventId -> exactly one effect on retry. State
machine pending_payment -> paid only. Unknown order / wrong tenant / arrives
early: ___ (decide and defend). -->

## 7. The missing-tenant decision
<!-- Missing or unknown tenant -> fail closed (401 at the edge, before business
logic). Never fall back to a default tenant: that would risk cross-tenant
exposure. One sentence defense. -->

## 8. What I prioritized under time pressure + one thing I'd push back on
<!-- What I cut and why (coherence > completeness). One thing I'd challenge a PM
on if they handed me this spec. -->
