# shopline

Small order service. TypeScript API layer (`src/`) and a Python storage/worker layer (`py/`).

## Layout

- `src/types.ts`: shared types (users, orders).
- `src/users.ts`: in-memory user directory.
- `src/orders.ts`: order totals and status changes.
- `py/store.py`: SQLite queries.
- `py/batch.py`: batch helpers.
