---
title: Groups, Rings, and Fields
date: 2026-10-17
tags: [cryptography, algebra, modular arithmetic]
---

# Groups, Rings, and Fields (with the Finite Field $\mathbb{F}_p$)

## 1. Modular Arithmetic

**Definition 1.1 (Congruence).** For an integer $n \ge 2$, $a \equiv b \pmod{n}$ means $n \mid (a-b)$.

*Example:* $17 \equiv 5 \pmod{12}$, since $17-5 = 12$ is divisible by $12$.

**Definition 1.2 (Integers mod $n$).** $\mathbb{Z}_n = \{0, 1, \dots, n-1\}$, with operations

$$
a \oplus b = (a+b) \bmod n, \qquad a \otimes b = (a \cdot b) \bmod n
$$

*Example ($n=6$):* $4 \oplus 5 = 9 \bmod 6 = 3$, and $4 \otimes 5 = 20 \bmod 6 = 2$.

**Lemma 1.3 (Well-definedness).** If $a \equiv a' \pmod{n}$ and $b \equiv b' \pmod{n}$, then

1. $a + b \equiv a' + b' \pmod{n}$
2. $a \cdot b \equiv a' \cdot b' \pmod{n}$

*Why this matters:* every residue class has many representatives (e.g. $3, 10, 17, -4$ are all "$3$" mod $7$). The lemma guarantees the result of an operation does not depend on which representative you pick. Without it, $\oplus$ and $\otimes$ would not be well-defined operations on $\mathbb{Z}_n$.

*Proof.* Since $a \equiv a'$ and $b \equiv b'$, there exist integers $k, l$ such that

$$
a' = a + kn, \qquad b' = b + ln.
$$

(1) Addition:

$$
a' + b' = (a+kn) + (b+ln) = (a+b) + n(k+l).
$$

So $(a'+b') - (a+b) = n(k+l)$ is divisible by $n$, hence $a'+b' \equiv a+b \pmod{n}$.

(2) Multiplication:

$$
a'b' = (a+kn)(b+ln) = ab + aln + knb + kln^2 = ab + n(al + kb + kln).
$$

So $a'b' - ab = n(al + kb + kln)$ is divisible by $n$, hence $a'b' \equiv ab \pmod{n}$. 

*Numerical check ($n=7$):* take $a=3,\ a'=10$ and $b=4,\ b'=11$.

- Sum: $3+4 = 7 \equiv 0$ and $10+11 = 21 \equiv 0$. ✓
- Product: $3\cdot 4 = 12 \equiv 5$ and $10 \cdot 11 = 110 = 15\cdot 7 + 5 \equiv 5$. ✓

---

## 2. Groups

**Definition 2.1 (Group).** A group $(G, \circ)$ is a set $G$ with a binary operation $\circ$ satisfying:

1. **Closure:** $a \circ b \in G$ for all $a, b \in G$.
2. **Associativity:** $(a \circ b) \circ c = a \circ (b \circ c)$.
3. **Identity:** there exists $e \in G$ with $a \circ e = e \circ a = a$ for all $a$.
4. **Inverses:** for each $a$ there exists $a^{-1}$ with $a \circ a^{-1} = a^{-1} \circ a = e$.

**Definition 2.2 (Abelian group).** A group is abelian if additionally $a \circ b = b \circ a$ for all $a, b \in G$. Order of operations is not important.

**Proposition 2.3.** The identity and inverses in a group are unique.

### Worked examples

**Example 2.4: $(\mathbb{Z}_7, +)$ is an abelian group.**

- Closure: $5+4 = 9 \equiv 2 \in \mathbb{Z}_7$.
- Identity: $0$, since $a + 0 = a$.
- Inverses:

| $a$  | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| ---- | --- | --- | --- | --- | --- | --- | --- |
| $-a$ | 0   | 6   | 5   | 4   | 3   | 2   | 1   |

- Commutative: $3+5 = 1 = 5+3$.

**Example 2.5: $(\mathbb{Z}_7 \setminus \{0\}, \cdot)$ is an abelian group.**

- Closure: $3 \cdot 5 = 15 \equiv 1 \in \mathbb{Z}_7\setminus\{0\}$. (A product of nonzero elements is never $0$ mod a prime.)
- Identity: $e = 1$, since $a \cdot 1 = a$ and $1 \in \mathbb{Z}_7\setminus\{0\}$.
- Inverses: for each $a$ we need $e \in \mathbb{Z}_7\setminus\{0\}$ with $a \cdot e \equiv 1$.

Taking $a=2$ as an example, the inverse rule gives $2 \cdot e \equiv 1 \pmod{7}$, i.e.

$$
2 \cdot e = 7k + 1.
$$

Put $k=1$:

$$
\begin{aligned}
2 \cdot e &= 7 \cdot 1 + 1 \\[1em]
2 \cdot e &= 8 \\[1em]
e &= 4
\end{aligned}
$$

Hence $e = 4 \in \mathbb{Z}_7\setminus\{0\}$.

| $a$      | 1   | 2   | 3   | 4   | 5   | 6   |
| -------- | --- | --- | --- | --- | --- | --- |
| $a^{-1}$ | 1   | 4   | 5   | 2   | 3   | 6   |

Check: $2\cdot 4 = 8 \equiv 1$, $3 \cdot 5 = 15 \equiv 1$, $6 \cdot 6 = 36 \equiv 1$.

**Example 2.6: $(\mathbb{Z}, \cdot)$ is not a group.** Closure, associativity and identity $1$ hold, but $2$ has no integer inverse (no integer $x$ satisfies $2x = 1$).

**Example 2.7: a non-abelian group.** Invertible $2\times 2$ matrices under multiplication. Take

$$
A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, \qquad
B = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}
$$

(both have determinant $1$, so both are invertible). Then

$$
AB = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}, \qquad
BA = \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}.
$$

So $AB \ne BA$ and the group is not abelian.

---

## 3. Rings

**Definition 3.1 (Ring).** A ring $(R, +, \cdot)$ is a set with two operations such that:

1. $(R, +)$ is an abelian group, with identity denoted $0$.
2. **Multiplication** is closed and associative.
3. **Multiplicative identity:** there exists $1 \in R$ with $a \cdot 1 = 1 \cdot a = a$. (Some texts omit this axiom; we assume it.)
4. **Distributivity:** $a(b+c) = ab + ac$ and $(a+b)c = ac + bc$.

A ring is **commutative** if $ab = ba$ for all $a, b$.

**Definition 3.2 (Unit).** An element $a \in R$ is a unit if there exists $b \in R$ with $ab = ba = 1$.

**Definition 3.3 (Zero divisor).** A nonzero $a \in R$ is a zero divisor if there exists a nonzero $b \in R$ with $ab = 0$.

**Theorem 3.4.** For every $n \ge 2$, $(\mathbb{Z}_n, \oplus, \otimes)$ is a commutative ring.

*Proof.* By Lemma 1.3 the operations are well defined, and they are closed by construction. Associativity, commutativity and distributivity hold in $\mathbb{Z}$, hence hold after reduction mod $n$. The additive identity is $0$, the multiplicative identity is $1$, and the additive inverse of $a$ is $n-a$ (for $a \neq 0$) or $0$ (for $a = 0$). No primality assumption is used. 

### Worked example: $\mathbb{Z}_6$ is a ring

- Closure: $4 \cdot 5 = 20 \equiv 2 \in \mathbb{Z}_6$.
- Associativity: $(2\cdot 3)\cdot 4 = 0 \cdot 4 = 0$ and $2 \cdot (3 \cdot 4) = 2 \cdot 0 = 0$. ✓
- Distributivity: $2(3+4) = 2 \cdot 1 = 2$ and $2\cdot 3 + 2 \cdot 4 = 0 + 2 = 2$. ✓
- Zero divisor: $2 \cdot 3 = 6 \equiv 0$ with $2, 3 \neq 0$.
- Units: only $1$ and $5$ (since $5 \cdot 5 = 25 \equiv 1$). The elements $2, 3, 4$ have no inverse.

So $\mathbb{Z}_6$ satisfies every ring axiom, but multiplicative inverses fail.

---

## 4. Fields

**Definition 4.1 (Field).** A field is a commutative ring $(F, +, \cdot)$ in which $1 \neq 0$ and every nonzero element is a unit. Equivalently:

1. $(F, +)$ is an abelian group with identity $0$.
2. $(F\setminus\{0\}, \cdot)$ is an abelian group with identity $1$.
3. Distributivity holds.

**Remark.** The additive identity $0$ and multiplicative identity $1$ are distinct. $0$ has no multiplicative inverse, so "every element has an inverse" applies to addition only; for multiplication it applies to nonzero elements.

**Proposition 4.2.** A field has no zero divisors.

*Proof.* Suppose $ab = 0$ with $a \neq 0$. Then $b = a^{-1}(ab) = a^{-1}\cdot 0 = 0$. 

**Hierarchy.** Every field is a ring, and every ring is an abelian group under addition.

| Structure | Operations | Guaranteed capabilities                   |
| --------- | ---------- | ----------------------------------------- |
| Group     | 1          | Combine, undo                             |
| Ring      | 2          | Add, subtract, multiply                   |
| Field     | 2          | Add, subtract, multiply, divide by nonzero |

### Worked example: $\mathbb{Z}_7$ is a field

Every nonzero element has an inverse (table from Example 2.5), so we can solve equations by dividing.

*Solve $3x \equiv 4 \pmod{7}$:* multiply both sides by $3^{-1} = 5$:

$$
x \equiv 5 \cdot 4 = 20 \equiv 6.
$$

Check: $3 \cdot 6 = 18 \equiv 4$. ✓

### Contrast: the same kind of equation in a ring that is not a field

*Solve $2x \equiv 3 \pmod{6}$:* the values of $2x$ for $x = 0, \dots, 5$ are $0, 2, 4, 0, 2, 4$. The value $3$ never appears, so there is **no solution**. Division by $2$ is impossible because $2$ is not a unit mod $6$.

---

## 5. When is $\mathbb{Z}_n$ a Field?

**Theorem 5.1.** $\mathbb{Z}_n$ is a field if and only if $n$ is prime.

*Proof.*

($\Leftarrow$) Let $n = p$ be prime and $1 \le a \le p-1$. Then $\gcd(a, p) = 1$. By Bézout's identity there exist integers $x, y$ with

$$
ax + py = 1,
$$

so $ax \equiv 1 \pmod{p}$. Thus $a$ is a unit.

($\Rightarrow$) Suppose $n$ is composite, $n = ab$ with $1 < a, b < n$. Then $a \cdot b \equiv 0$ with $a, b \neq 0$, so $a$ is a zero divisor. If $a$ had an inverse $a^{-1}$, then $b = a^{-1}ab = a^{-1}\cdot 0 = 0$, a contradiction. Hence $\mathbb{Z}_n$ is not a field. 

**Corollary 5.2.** The units of $\mathbb{Z}_n$ are exactly the $a$ with $\gcd(a, n) = 1$. Their count is $\varphi(n)$, Euler's totient function. They form a group $\mathbb{Z}_n^{*}$.

*Example ($n = 12$):* the units are $\{1, 5, 7, 11\}$, so $\varphi(12) = 4$. Check: $5\cdot 5 = 25 \equiv 1$, $7 \cdot 7 = 49 \equiv 1$, $11\cdot 11 = 121 \equiv 1$. The elements $2, 3, 4, 6, 8, 9, 10$ share a factor with $12$, so they are not units.

**Examples summary.**

| Set                          | Ring | Field | Reason                                       |
| ---------------------------- | ---- | ----- | -------------------------------------------- |
| $\mathbb{Z}$                 | Yes  | No    | $2$ has no inverse                           |
| $\mathbb{Z}_6$               | Yes  | No    | $2\cdot 3 \equiv 0$; $2x \bmod 6 \in \{0,2,4\}$ |
| $\mathbb{Z}_8$               | Yes  | No    | $2 \cdot 4 \equiv 0$                         |
| $\mathbb{Z}_7$               | Yes  | Yes   | $7$ prime; e.g. $2\cdot 4 \equiv 1$          |
| $\mathbb{Q}, \mathbb{R}, \mathbb{C}$ | Yes | Yes | all nonzero elements invertible          |
| $\mathbb{R}[x]$              | Yes  | No    | $x$ has no polynomial inverse                |

---

## 6. The Finite Field $\mathbb{F}_p$ ($p$ prime)

**Notation.** $\mathbb{F}_p = \mathbb{Z}_p = \{0, 1, \dots, p-1\}$.

| Property      | Additive                          | Multiplicative                  |
| ------------- | --------------------------------- | ------------------------------- |
| Identity      | $0$                               | $1$                             |
| Inverse of $a$ | $-a = p-a$ ($0$ if $a=0$)        | $a^{-1}$ (exists iff $a \neq 0$) |

**Example in $\mathbb{F}_7$.** $-3 = 4$ since $3+4 \equiv 0$. $3^{-1} = 5$ since $3\cdot 5 = 15 \equiv 1$.