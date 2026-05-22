// 默认数据 - 从简历提取
window.DEFAULT_DATA = {
  about_title: '关于我',
  about_lead: '热爱影视、游戏与 AIGC 的视觉创作者，专注于将创意快速转化为高完成度的视频与交互作品。',
  about_portrait: 'https://images.unsplash.com/photo-1606293459208-f3e3a3c2f0ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  contact_phone: '188 3787 7088',
  contact_email: '424573509@qq.com',
  contact_phone2: '188 3787 7088',
  contact_email2: '424573509@qq.com',

  about_points: [
    '思维活跃，富有创意，紧跟互联网潮流，曾与明基显示屏合作产出广告。',
    '具备独立创作 3DCG 视频的能力，作品在抖音、小红书累计播放量超 2300 万。',
    '熟悉 Blender 全流程及 AI 工具（TapNow、即梦 AI、Vidu AI 等），高效实现创意视觉表达。',
    '对影视、游戏等内容有深度体验与见解，融合国风与前沿视觉风格进行创作。',
    '积极探索 Vibe Coding 领域，借助 Trae、墨刀 AI、Google Stitch 等工具将创意快速转化为可交互原型。'
  ],

  skills: [
    { icon: '塑', title: '三维建模', desc: 'Blender 全流程，独立完成模型/绑定/动画/渲染', level: 92 },
    { icon: 'AI', title: 'AIGC 创作', desc: 'TapNow / 即梦 / Vidu / 海螺 / 可灵 / NanoBanana', level: 95 },
    { icon: '剪', title: '剪辑调色', desc: 'PR / 剪映 / DaVinci 调色 / AE / Nuke 合成', level: 88 },
    { icon: '码', title: 'Vibe Coding', desc: 'Trae / 墨刀 AI / Google Stitch · 创意转原型', level: 80 },
    { icon: 'UE', title: '虚拟制片', desc: 'UE5 地编 + Aximmetry 虚拟直播', level: 78 }
  ],

  tools: [
    'Blender', 'Unreal Engine 5', 'After Effects', 'Premiere Pro', 'Nuke', 'DaVinci Resolve',
    'Photoshop', '剪映', 'Aximmetry', 'TapNow', '即梦 AI', '海螺 AI', 'Vidu AI', '可灵 AI',
    'Liblib', 'NanoBanana', 'Trae', '墨刀 AI', 'Google Stitch', 'WebGAL', 'RPG Maker', 'GitHub Pages'
  ],

  experience: [
    {
      company: '腾讯云雀',
      role: 'AI 视频美学评估',
      period: '2026.04 - 至今',
      points: [
        '影视内容深度解析：负责院线电影、剧集、动画、纪录片、创意短片等的逐帧专业拉片，建立标准化内容认知框架。',
        '专业美学标注产出：为视频镜头撰写兼具专业性、叙事性与艺术表现力的标注文案，支撑大模型视频理解与生成。',
        '视觉元素精准拆解：系统标注构图、光影、色彩、镜头运动、场面调度、表演与情绪等核心美学要素。',
        '叙事逻辑与氛围提炼：分析剪辑节奏与转场，完成段落级视听表达特征标注。',
        '标注体系迭代共建：参与规则培训、质量校准与案例复盘，推动标注标准的迭代与覆盖度。',
        '团队带教与质量管控：负责外包标注人员的带教与抽检复核，保障训练数据的专业度与一致性。'
      ],
      result: ''
    },
    {
      company: '中国广播电视社会组织联合会',
      role: 'AI 视频设计',
      period: '2026.02 - 2026.03',
      points: [
        '负责从创意策划到成片输出的全流程创作，主要面向海外社交流媒体平台。',
        '打造以中国医疗为主题的 AI 真人短剧内容，结合海外受众需求与品牌定位。',
        '独立完成剧本撰写、角色设定及分镜设计，确保内容符合海外用户审美与传播逻辑。',
        '通过 AI 技术实现高效视频生成与优化，提升内容产出效率。'
      ],
      result: ''
    },
    {
      company: '嘉兴九州文化传媒有限公司',
      role: 'AIGC 视频生成',
      period: '2026.01 - 2026.02',
      points: [
        '内容创作：独立完成短剧文本细微修改，优化故事情节和对话，提升内容质量。',
        '视频制作：负责短剧的配音、剪辑和视频生成，确保流畅度与视听效果。',
        '视觉设计：独立设计短剧海报和分镜，确保视觉元素与内容风格一致。',
        '技术应用：运用 AIGC 技术将短篇小说转化为短剧内容，探索 AI 在影视创作中的应用。'
      ],
      result: '成功推动多个 AIGC 短剧项目落地，涵盖末日、宫斗、系统、言情等多种风格，提升项目完成度与用户吸引力。'
    }
  ],

  projects: [
    {
      title: '《化龙》 — 第十一届世界渲染大赛',
      cat: '3DCG 动画',
      period: '2025.08',
      desc: '以"极限狂飙"为主题，独立完成从分镜到成片的全流程制作。融入新国风与仙侠题材，使用 Blender 搭建场景与灯光，并以即梦 AI、Vidu AI 辅助概念生成与背景贴图制作。',
      meta: ['抖音 545万+', '小红书 47万+', '新国风 / 仙侠'],
      link: 'https://v.douyin.com/ZmLvz0BXvpU/'
    },
    {
      title: '《水墨世界》 — 第九届世界渲染大赛',
      cat: '3DCG 动画',
      period: '2024.08',
      desc: '围绕"动能冲刺"自主完成全流程 3DCG 短片，涵盖概念设定、建模、动画、渲染与后期合成。融合水墨艺术与仙侠元素，通过 Blender 实现动态粒子与风格化渲染。',
      meta: ['抖音 1800万+', '小红书 27万+', '水墨风格'],
      link: 'https://v.douyin.com/LNGlzwjR9NA/'
    },
    {
      title: '《诡异事件录》 — Vibe Coding 网站',
      cat: '网站 / 交互',
      period: '2026.03 - 2026.04',
      desc: '独立完成从需求到上线全流程，采用「AI 原型生成 + 代码智能修改」工作流，零前端基础 2 周完成。实现全球 3D 交互式地图，支持 100+ 灵异事件可视化展示。',
      meta: ['3D 地图', '100+ 事件', 'GitHub Pages'],
      link: 'https://jinwohuli.github.io/guiyishijianlu/'
    },
    {
      title: '《推理小说十诫》 — 像素 RPG',
      cat: '独立游戏',
      period: '2025.03 - 2025.05',
      desc: '基于 RPG Maker 引擎独立完成校园推理游戏全流程开发：选题策划、关卡设计、剧情脚本、事件逻辑与测试优化。设计 6 名嫌疑人与多场景搜证，实现非线性推理体验。',
      meta: ['RPG Maker', '校园推理', '非线性叙事'],
      link: ''
    },
    {
      title: '《逐光》 — 互动叙事游戏',
      cat: '互动叙事',
      period: '2024.03 - 2024.06',
      desc: '基于《卡拉比丘》的二次创作互动叙事游戏。使用 WebGAL 引擎搭建框架，完成交互逻辑、分支选项、场景跳转与变量判定，确保多线剧情稳定运行。',
      meta: ['WebGAL', '多线剧情', '二次创作'],
      link: ''
    }
  ],

  education: [
    {
      period: '2023 - 2027',
      school: '四川传媒学院',
      major: '本科 · 影视技术',
      courses: '三维动画设计与制作、AIGC 影视制作、虚拟制片、创意思维训练、达芬奇影视调色、NUKE 视效合成、Adobe 系列（PR、AE、PS）、UE5 场景制作'
    }
  ],

  // 作品集 - 默认放入项目里的几个亮点作品
  portfolio: [
    {
      id: 'w1',
      title: '化龙 · 第十一届世界渲染大赛',
      category: '3d',
      year: '2025',
      desc: '以"极限狂飙"为主题，独立完成从分镜到成片的新国风仙侠题材 3DCG 短片。抖音播放 545 万+、小红书 47 万+。',
      link: 'https://v.douyin.com/ZmLvz0BXvpU/',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
      ]
    },
    {
      id: 'w2',
      title: '水墨世界 · 第九届世界渲染大赛',
      category: '3d',
      year: '2024',
      desc: '融合水墨艺术与仙侠元素的 3DCG 短片，Blender 动态粒子与风格化渲染。抖音播放 1800 万+。',
      link: 'https://v.douyin.com/LNGlzwjR9NA/',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
      ]
    },
    {
      id: 'w3',
      title: '诡异事件录 · 地理可视化',
      category: 'web',
      year: '2026',
      desc: '采用 AI 原型 + 代码智能修改的 Vibe Coding 工作流，独立完成 3D 交互式全球地图，展示 100+ 灵异事件。',
      link: 'https://jinwohuli.github.io/guiyishijianlu/',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
      ]
    },
    {
      id: 'w4',
      title: '推理小说十诫 · 像素 RPG',
      category: 'game',
      year: '2025',
      desc: '基于 RPG Maker 的校园推理游戏，6 名嫌疑人与多场景搜证，非线性推理体验。',
      link: '',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
      ]
    },
    {
      id: 'w5',
      title: '逐光 · 互动叙事游戏',
      category: 'game',
      year: '2024',
      desc: '基于《卡拉比丘》二次创作的 WebGAL 互动叙事游戏，含多线剧情与分支选项。',
      link: '',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
      ]
    },
    {
      id: 'w6',
      title: 'AIGC 短剧合集',
      category: 'video',
      year: '2026',
      desc: '面向海外社交媒体的 AI 真人短剧（医疗主题），及末日、宫斗、系统、言情等多风格 AIGC 短剧。',
      link: '',
      media: [
        { type: 'image', src: 'https://images.unsplash.com/photo-1489599735734-79b4625c6196?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
      ]
    }
  ]
};
