# 기획·설계 문서(Markdown)를 공개용 정적 HTML로 변환해 web/public/docs/ 에 둔다.
# 사용: python build_docs.py <planning_dir> <game_docs_dir> <ui_draft_dir>
#   planning_dir : 기획·결정 문서 폴더(하위 received/ 포함)
#   game_docs_dir: 게임 저장소 docs/ 폴더(features/, BALANCE_LOG.md)
#   ui_draft_dir : UI 설계 초안 폴더(선택)
# 내부 도구·모델 이름, 절대 경로, 세션 식별자, 개인 계정은 치환하거나 지운다.
import html, os, re, sys, datetime

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "docs")

SUBS = [
    (re.compile(r"instagram\.com/[^\s|)`]+|인스타그램 계정 [^\s|,)]+|Instagram 계정 [^\s|,)]+", re.I), "(참고 계정)"),
    (re.compile(r"owol\.xx", re.I), "(참고 계정)"),
    (re.compile(r"Meshy|meshy|Tripo|tripo|nano-?banana[\w-]*", re.I), "외부 3D 생성 도구"),
    (re.compile(r"ChatGPT|chatgpt|OpenAI|GPT-?\d[\w.-]*|\bGPT\b", re.I), "기획 도구"),
    (re.compile(r"Claude Code|Claude|Codex|Opus ?[\d.]*|Astra|Sonnet|Fable ?[\d.]*|Anthropic|\bluna\b|Orca", re.I), "개발 세션"),
    (re.compile(r"uds:\\\\[^\s|)]+|cc-msg-[0-9a-f]+|term_[0-9a-f-]+|gamedevelop-[0-9a-f]{2}"), "(세션)"),
    (re.compile(r"[A-Za-z]:[\\/][^\s|)`>]+"), "(내부 경로)"),
    (re.compile(r"`?Saved/[^\s|)`]+`?"), "(내부 경로)"),
    (re.compile(r"Xotepsin|ttaenggul|ju00moon[\w@.-]*", re.I), "(사용자)"),
]
BANNED = re.compile(r"meshy|tripo|chatgpt|openai|claude|codex|anthropic|gpt-?\d|opus|astra|luna|orca|instagram|owol|xotepsin|ju00moon|[A-Za-z]:[\\/]|cc-msg-|term_[0-9a-f]", re.I)


def clean(t):
    for rx, r in SUBS:
        t = rx.sub(r, t)
    return t


def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", t)
    return t


def convert(md):
    out, i, lines = [], 0, md.splitlines()
    in_list = None
    in_code = False

    def close_list():
        nonlocal in_list
        if in_list:
            out.append(f"</{in_list}>")
            in_list = None

    while i < len(lines):
        ln = lines[i]
        if ln.strip().startswith("```"):
            if in_code:
                out.append("</code></pre>")
                in_code = False
            else:
                close_list()
                out.append("<pre><code>")
                in_code = True
            i += 1
            continue
        if in_code:
            out.append(html.escape(ln))
            i += 1
            continue
        if ln.startswith("|") and i + 1 < len(lines) and re.match(r"^\|[\s:|-]+\|?\s*$", lines[i + 1]):
            close_list()
            out.append("<table>")
            hdr = [c.strip() for c in ln.strip().strip("|").split("|")]
            out.append("<tr>" + "".join(f"<th>{inline(c)}</th>" for c in hdr) + "</tr>")
            i += 2
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in cells) + "</tr>")
                i += 1
            out.append("</table>")
            continue
        m = re.match(r"^(#{1,4})\s+(.*)", ln)
        if m:
            close_list()
            lvl = len(m.group(1))
            out.append(f"<h{lvl}>{inline(m.group(2))}</h{lvl}>")
            i += 1
            continue
        m = re.match(r"^\s*[-*]\s+(.*)", ln)
        if m:
            if in_list != "ul":
                close_list()
                out.append("<ul>")
                in_list = "ul"
            out.append(f"<li>{inline(m.group(1))}</li>")
            i += 1
            continue
        m = re.match(r"^\s*\d+[.)]\s+(.*)", ln)
        if m:
            if in_list != "ol":
                close_list()
                out.append("<ol>")
                in_list = "ol"
            out.append(f"<li>{inline(m.group(1))}</li>")
            i += 1
            continue
        if ln.strip() == "":
            close_list()
            i += 1
            continue
        if ln.startswith(">"):
            close_list()
            out.append(f"<blockquote>{inline(ln.lstrip('> '))}</blockquote>")
            i += 1
            continue
        close_list()
        out.append(f"<p>{inline(ln)}</p>")
        i += 1
    close_list()
    if in_code:
        out.append("</code></pre>")
    return "\n".join(out)


STYLE = """
:root{--bg:#111110;--surface:#1a1a19;--line:#3a3a37;--ink:#fff;--ink-2:#c3c2b7;--ink-3:#8b8a80;--gold:#c9a227;--gold-soft:#e3c766}
body{margin:0;background:var(--bg);color:var(--ink-2);font:15px/1.7 -apple-system,"Pretendard","Noto Sans KR",sans-serif}
.wrap{max-width:900px;margin:0 auto;padding:40px 16px 80px}
a{color:var(--gold-soft)} .top{font-size:12px;letter-spacing:.2em;color:var(--ink-3)}
h1,h2,h3,h4{font-family:"Nanum Myeongjo","Noto Serif KR",serif;font-weight:400;color:var(--ink);line-height:1.35}
h1{font-size:28px;margin:8px 0 6px} h2{font-size:21px;margin:40px 0 10px;padding-top:18px;border-top:1px solid var(--line)} h3{font-size:17px;margin:26px 0 8px} h4{font-size:15px;margin:18px 0 6px;color:var(--gold-soft)}
p{margin:0 0 12px} ul,ol{margin:0 0 14px;padding-left:22px} li{margin:3px 0}
table{border-collapse:collapse;width:100%;margin:12px 0 18px;font-size:13.5px;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:7px 10px;text-align:left;vertical-align:top} th{background:var(--surface);color:var(--ink)}
code{font-size:13px;background:var(--surface);padding:1px 5px;border-radius:3px} pre{background:var(--surface);padding:12px;overflow-x:auto;border:1px solid var(--line)}
blockquote{margin:0 0 12px;padding-left:14px;border-left:2px solid var(--gold);color:var(--ink-3)}
.note{margin-top:48px;padding-top:16px;border-top:1px solid var(--line);font-size:12.5px;color:var(--ink-3)}
.status{display:inline-block;margin-left:8px;padding:1px 8px;border:1px solid var(--line);border-radius:999px;font-size:11px;color:var(--ink-3)}
.status.fixed{border-color:var(--gold);color:var(--gold-soft)}
.list li{margin:7px 0}
"""

TPL = """<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} — CELESTIEL</title><style>{style}</style></head><body><div class="wrap">
<div class="top"><a href="/docs/">← 문서 보관함</a> · <a href="/progress">개발 현황</a></div>
{body}
<div class="note">개발팀 내부 기획·설계 문서를 공개용으로 정리한 판입니다. 상태 표시가 '확정'이 아닌 문서는 초안·제안·검토 단계이며 수치와 순서는 만들면서 바뀝니다. 갱신 {date}.</div>
</div></body></html>"""


# 파일명·경로로 분류와 상태를 정한다
def classify(rel, name):
    n = name.lower()
    if rel.startswith("received/"):
        return "원전 기획 자료(사용자 확정본)", "확정", True
    if n == "decisions.md":
        return "결정 기록", "확정", True
    if n == "balance_log.md":
        return "수치 기록", "적용", True
    if rel.startswith("features/"):
        return "사양·계약·계획(개발팀 승인본)", "승인", True
    if "proposal" in n:
        return "기획안(제안)", "제안", False
    if "draft" in n:
        return "설계 초안", "초안", False
    if "design" in n:
        return "설계서", "확인 대기", False
    if "review" in n or "gap" in n:
        return "검토 문서", "검토", False
    if n.startswith("level_") or "plan" in n:
        return "레벨·공간 계획", "계획", False
    return "기타 문서", "문서", False


def slug(name):
    s = re.sub(r"\.md$", "", name, flags=re.I).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s + ".html"


def first_title(md, fallback):
    for ln in md.splitlines():
        m = re.match(r"^#\s+(.*)", ln)
        if m:
            return clean(m.group(1)).strip()
    return fallback


def main(planning, game_docs, ui_draft):
    os.makedirs(OUT, exist_ok=True)
    sources = []
    for root, _, files in os.walk(planning):
        for f in files:
            if f.lower().endswith(".md"):
                p = os.path.join(root, f)
                rel = os.path.relpath(p, planning).replace("\\", "/")
                sources.append((p, rel, f))
    feat = os.path.join(game_docs, "features")
    if os.path.isdir(feat):
        for f in sorted(os.listdir(feat)):
            if f.lower().endswith(".md"):
                sources.append((os.path.join(feat, f), "features/" + f, f))
    bl = os.path.join(game_docs, "BALANCE_LOG.md")
    if os.path.exists(bl):
        sources.append((bl, "BALANCE_LOG.md", "BALANCE_LOG.md"))
    if ui_draft and os.path.isdir(ui_draft):
        for f in sorted(os.listdir(ui_draft)):
            if f.lower().endswith(".md"):
                sources.append((os.path.join(ui_draft, f), "ui-draft/" + f, "ui-" + f))

    today = datetime.date.today().isoformat()
    entries = []
    for p, rel, name in sources:
        md = clean(open(p, encoding="utf-8", errors="replace").read())
        body = convert(md)
        left = [l for l in body.splitlines() if BANNED.search(l)]
        if left:
            # 남은 금지어 줄은 통째로 지운다
            body = "\n".join(l for l in body.splitlines() if not BANNED.search(l))
        cat, status, fixed = classify(rel, name)
        title = first_title(md, name)
        out_name = ("received-" if rel.startswith("received/") else "features-" if rel.startswith("features/") else "") + slug(name)
        mtime = datetime.date.fromtimestamp(os.path.getmtime(p)).isoformat()
        open(os.path.join(OUT, out_name), "w", encoding="utf-8").write(TPL.format(title=html.escape(title), style=STYLE, body=body, date=today))
        entries.append((cat, status, fixed, title, out_name, mtime, len(left)))
        print(f"{out_name:60s} {status:6s} 제거줄 {len(left)}")

    # 목록 페이지
    order = ["결정 기록", "원전 기획 자료(사용자 확정본)", "사양·계약·계획(개발팀 승인본)", "수치 기록", "설계서", "설계 초안", "기획안(제안)", "레벨·공간 계획", "검토 문서", "기타 문서"]
    parts = []
    for cat in order:
        items = sorted([e for e in entries if e[0] == cat], key=lambda e: e[5], reverse=True)
        if not items:
            continue
        parts.append(f"<h2>{html.escape(cat)}</h2><ul class=\"list\">")
        for _, status, fixed, title, out_name, mtime, _ in items:
            cls = "status fixed" if fixed else "status"
            parts.append(f'<li><a href="/docs/{out_name}">{html.escape(title)}</a><span class="{cls}">{status}</span> <span style="color:var(--ink-3);font-size:12px">{mtime}</span></li>')
        parts.append("</ul>")
    summary_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "docs_summary.md")
    summary = convert(clean(open(summary_path, encoding="utf-8").read())) if os.path.exists(summary_path) else ""
    index_body = "<h1>문서 보관함</h1><p>CELESTIEL 개발팀의 기획·설계·검토·결정 문서 전체입니다. 확정된 것과 아직 제안·초안 단계인 것이 함께 있으니 상태 표시를 보고 읽어 주세요. 이 목록은 기획 참고용이며 문서가 갱신되면 다시 올립니다.</p>" + summary + "\n".join(parts)
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(TPL.format(title="문서 보관함", style=STYLE, body=index_body, date=today))
    print("index.html", len(entries), "문서")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
