---
title: "Can a New Company Maintain Software It Did Not Build?"
description: "Yes—a new company can maintain inherited software. See what a safe UK support takeover needs, what happens first and when project rescue is required."
published: "2026-09-11"
category: "software-consultancy"
tags:
  - "Application Support"
  - "Software Maintenance"
  - "Project Handover"
  - "Inherited Software"
image: "/assets/blog/can-a-new-company-maintain-software-it-did-not-build-1200x630.jpg"
imageAlt: "Two engineering teams transferring operational knowledge and control of an existing software system"
draft: false
---

Yes. A capable software company can maintain and improve an application built
by somebody else. Perfect documentation and the original developers are
helpful, but they are not essential.

What matters is whether the new team can establish control, reproduce the
software, understand the important user journeys and make changes without
creating unacceptable risk. A good takeover starts by reducing uncertainty,
not by promising features or proposing a rewrite.

This guide explains what the new team needs, what a controlled first month can
look like and when a maintenance handover should become a project rescue.

## What does a new maintenance team need?

The source code is only one part of a working product. Before accepting ongoing
responsibility, a new team needs enough access and evidence to understand how
the service is built, released and operated.

Start with six practical areas:

| Area | What to establish |
| --- | --- |
| Ownership | Who controls the repositories, cloud accounts, domains, data and third-party services |
| Environments | How development, test and production differ, and how configuration is managed |
| Delivery | How to build, test, release and roll back a change |
| Operations | Where logs, monitoring, backups, incidents and support requests can be found |
| Product knowledge | Which journeys matter most, who uses them and what must not be disrupted |
| Responsibilities | Who approves changes, handles incidents and makes business decisions |

Missing documentation does not automatically prevent a takeover. Repository
history, production behaviour, logs, infrastructure configuration and
conversations with users can help rebuild the missing picture. Missing control
is more serious: a team cannot safely support a system if nobody can administer
its hosting, restore its data or release a tested change.

Access should also be deliberate. The UK National Cyber Security Centre advises
organisations to limit supplier access to what is needed, remove it when the
work ends and agree responsibilities, logging and incident procedures. Its
[guidance for choosing and working with a managed service provider](https://www.ncsc.gov.uk/guidance/choosing-a-managed-service-provider-msp)
provides a useful set of questions even when the supplier is maintaining a
bespoke application rather than providing general IT support.

If the software processes personal data and the new company will act as a
processor, the handover may also require updated contractual and security
arrangements. The ICO explains the required areas in its
[guidance on controller–processor contracts](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/).
Obtain appropriate advice for your circumstances rather than treating a
technical handover as a substitute for a contract review.

## What should happen in the first 30 days?

Thirty days is not a promise that every system will be fully understood. It is
a useful structure for moving from unfamiliar software to controlled support.
The pace should reflect the product's complexity and operational risk.

### Days 1–5: establish control

The team confirms access, identifies the business-critical journeys and checks
whether backups, monitoring and a known production release are available. Any
immediate continuity or security risk is made visible before routine work
begins.

The useful outcome is a shared system inventory and a short list of blockers,
not a long report about every imperfection in the codebase.

### Days 6–15: reproduce and observe

The team builds and runs the application away from production, traces its main
dependencies and watches how the live service behaves. Existing incidents,
support requests and release history help distinguish recurring operational
problems from isolated defects.

The useful outcome is evidence that the software can be changed and tested in
a controlled environment, plus a clear view of what still depends on missing
knowledge or access.

### Days 16–30: prove the support path

The team completes one appropriately small change through the agreed review,
test and release process. It then documents the support intake, escalation
route, monitoring responsibilities and initial maintenance priorities.

The useful outcome is not simply a closed ticket. It is proof that the new team
can diagnose, change, release and explain the system without relying on the
previous supplier.

## Does the system need support or project rescue?

Ongoing maintenance works best when the product is broadly stable and the main
control points can be established. A different first step is safer when the
software is already in distress.

| Situation | Sensible starting point |
| --- | --- |
| The service is live and stable, but needs a new long-term owner | Support takeover and maintenance plan |
| Releases work, but monitoring, dependencies or documentation need improvement | Support takeover with a prioritised improvement backlog |
| Production is unstable, delivery has stalled or essential access is missing | Focused project rescue assessment before ongoing support |
| The product no longer fits the business need | Evidence-led replacement decision, not automatic maintenance or rewrite |

If incidents are recurring, nobody can produce a safe build or the business
does not control its own accounts, read our guide to
[taking over a stalled software project](/blog/software-project-rescue-uk) and
consider a focused [Software Project Rescue assessment](/services/software-project-rescue)
before agreeing a routine support arrangement.

## What does good inherited-software support look like?

A maintenance partner should make the system easier to understand and safer to
change over time. In practice, that means:

- a clear route for incidents, service requests and planned improvements;
- monitoring and logs tied to the journeys that matter to the business;
- small, reviewable changes with an understood release and rollback path;
- visible dependency, security and platform maintenance;
- concise runbooks for recurring operational work; and
- regular priorities and decisions that a non-technical owner can understand.

The goal is not to create permanent dependency on another supplier. Your
organisation should retain control of its repositories, accounts, data and
documentation, with a practical exit and handover route from the beginning.

## Five questions to ask a prospective support company

Before appointing a new maintenance provider, ask:

1. What do you need to inspect before accepting support responsibility?
2. How will you protect the live service while learning the system?
3. What will you aim to prove during the first month?
4. How will incidents, routine maintenance and product improvements be prioritised?
5. What will we own, understand and be able to hand over if the arrangement ends?

Be cautious if a supplier offers a fixed long-term commitment without first
seeing the code and operating environment, recommends a complete rewrite before
gathering evidence or cannot explain how access and knowledge will return to
you at the end.

## Start with a support takeover review

Changing software provider does not have to begin with a large migration or a
long contract. A focused review can establish what you control, what the new
team can reproduce, which risks need attention and whether the right next step
is maintenance, stabilisation or a separate recovery project.

DuniaOps helps UK organisations take over and maintain existing web platforms,
APIs, internal systems and cloud-hosted applications. We begin with the current
evidence, define achievable support boundaries and recommend the smallest safe
next step.

[Request a Support Takeover Review](/?service=support&from=blog#contact) to
discuss the software, its current support position and what a controlled
handover would need.
